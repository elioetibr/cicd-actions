"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.versionPattern = versionPattern;
exports.splitSemanticVersion = splitSemanticVersion;
exports.validateSemanticVersion = validateSemanticVersion;
exports.ensureSemanticVersionPrefix = ensureSemanticVersionPrefix;
exports.parseYaml = parseYaml;
exports.downloadManifestFileContent = downloadManifestFileContent;
exports.getErrorMessage = getErrorMessage;
exports.handleError = handleError;
// functions.ts
const core = __importStar(require("@actions/core"));
const yaml = __importStar(require("js-yaml"));
function versionPattern() {
    return /(.*)((\d+)\.(\d+)\.(\d+))(.*)/gm;
}
/**
 * Splits a semantic version into an array of its components.
 *
 * @param {string} version - The semantic version to split.
 * @return {string[]} - An array containing the components of the semantic version.
 */
function splitSemanticVersion(version) {
    return ensureSemanticVersionPrefix(version)
        .replace(versionPattern(), '$2')
        .split('.');
}
/**
 * Validates whether a version string is a semantic version.
 *
 * @param {string} version - The version string.
 * @return {boolean} - True if valid, false otherwise.
 */
function validateSemanticVersion(version) {
    const matcher = ensureSemanticVersionPrefix(version).match(versionPattern());
    return matcher !== null && matcher.length > 0;
}
/**
 * Ensures the version string has a "v" prefix.
 *
 * @param {string} version - The version string.
 * @return {string} - The version string with "v" prefix.
 */
function ensureSemanticVersionPrefix(version) {
    return version.startsWith('v') || version === '' ? version : 'v' + version;
}
/**
 * Parses YAML content and returns a configuration object.
 *
 * @param {string} content - The YAML content.
 * @return {Config} - The parsed configuration.
 */
function parseYaml(content) {
    return yaml.load(content);
}
/**
 * Retrieves the content of a manifest file from a repository.
 *
 * @param {Octokit} octokit - Octokit client instance.
 * @param {Inputs} inputs - Action inputs.
 * @returns {Promise<Config>} - Parsed configuration object.
 */
async function downloadManifestFileContent(octokit, inputs) {
    try {
        core.info(`Retrieving file ${inputs.gitops_file} from "${inputs.owner}/${inputs.repo}" on branch: ${inputs.ref}`);
        const response = await octokit.rest.repos.getContent({
            owner: inputs.owner,
            repo: inputs.repo,
            path: inputs.gitops_file.replace('./', '').trim(),
            ref: inputs.ref,
        });
        core.info(`Retrieved file ${inputs.gitops_file} from "${inputs.owner}/${inputs.repo}" on branch: ${inputs.ref}`);
        let content = '';
        if (!Array.isArray(response.data) && response.data.type === 'file') {
            content = Buffer.from(response.data.content, 'base64').toString();
        }
        return parseYaml(content);
    }
    catch (error) {
        const message = `Error when try to retrieved file ${inputs.gitops_file} from "${inputs.owner}/${inputs.repo}" on branch: ${inputs.ref}. Please check if it exists.`;
        handleError(error, message);
    }
}
/**
 * Extracts error message from an unknown error object.
 *
 * @param {unknown} error - The error object.
 * @return {string} - Extracted error message.
 */
function getErrorMessage(error) {
    return error instanceof Error ? error.message : String(error);
}
/**
 * Handles and logs an error.
 *
 * @param {unknown} error - The error to handle.
 * @param additionalErrorMessage
 */
function handleError(error, additionalErrorMessage = '') {
    const message = getErrorMessage(error);
    let finalMessage;
    if (additionalErrorMessage !== '') {
        finalMessage = additionalErrorMessage + ' => ' + message;
    }
    else {
        finalMessage = message;
    }
    throw finalMessage;
}
//# sourceMappingURL=functions.js.map