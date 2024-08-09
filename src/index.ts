// index.ts
import * as core from '@actions/core';
import { context } from '@actions/github';
import { Octokit } from '@octokit/rest';

import { downloadManifestFileContent, ensureSemanticVersionPrefix, splitSemanticVersion, handleError } from './functions';
import { EnvironmentService } from './services/environmentService'
import { Inputs, Outputs } from './interfaces/actions'
import { ManifestService } from './services/manifestService'

/**
 * Runs the method to get the deployment repository variable using the Octokit client authenticated with the given inputs.
 * @param {Inputs} inputs - The inputs required to authenticate and fetch the deployment repository variable.
 * @return {Promise<Outputs>} - A promise that resolves with the output values after retrieving the deployment repository variable.
 */
export async function run(inputs: Inputs): Promise<Outputs | undefined> {
  const octokit = new Octokit({ auth: inputs.token });
  const manifestContent = await downloadManifestFileContent(octokit, inputs);

  if (manifestContent !== undefined) {
    core.debug(`Manifest Content: ${JSON.stringify(manifestContent, null, 2)}`);

    const environmentService = new EnvironmentService(manifestContent);
    const manifestService = new ManifestService(manifestContent, environmentService);
    const manifest = manifestService.getManifest(inputs.environment, inputs.version, inputs.ref);
    const sem_ver = ensureSemanticVersionPrefix(inputs.version)
    const [major, minor, patch] = splitSemanticVersion(sem_ver);

    return {
      ...manifest,
      major,
      minor,
      patch,
      sem_ver: sem_ver,
    } as Outputs;
  } else {

  }
}

/**
 * Runs the index functionality of the program.
 *
 * @return {Promise<void>} A Promise that resolves once the index functionality is completed.
 */
async function main(): Promise<void> {
  try {
    const outputs = await run({
      version: core.getInput('version', { required: true }),
      gitops_file: core.getInput('gitops_file', { required: true }),
      environment: core.getInput('environment', { required: false }) || 'dev',
      owner: core.getInput('owner', { required: false }) || context.repo.owner,
      repo: core.getInput('repo', { required: true }),
      ref: core.getInput('ref', { required: true }),
      token: core.getInput('token', { required: false }) || process.env.GITHUB_TOKEN,
    });

    if (outputs !== undefined) {
      core.debug(` Outputs => ${JSON.stringify(outputs)}`);

      Object.entries(outputs).forEach(([key, value]) => {
        if (value !== undefined) {
          core.setOutput(key, value);
        }
      });
    }
  } catch (error) {
    handleError(error);
  }
}

if (!process.env.JEST_WORKER_ID) {
  main()
    .then(() => core.debug('Starting CI/CD Actions.'))
    .catch((e: Error) => {
      core.debug('Actions ends with some error.')
      core.setFailed(e)
    })
    .finally(() => {});
}
