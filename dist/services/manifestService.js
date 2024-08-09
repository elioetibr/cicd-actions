"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManifestService = void 0;
const functions_1 = require("../functions");
/**
 * Represents a service for getting a manifest.
 */
class ManifestService {
    config;
    environmentService;
    constructor(config, environmentService) {
        this.config = config;
        this.environmentService = environmentService;
    }
    getManifest(environment, version, branch) {
        const versionWithPrefix = (0, functions_1.ensureSemanticVersionPrefix)(version);
        const environmentResult = this.environmentService.getEnvironmentData(environment);
        if (!environmentResult)
            return null;
        return {
            ...this.getDefaultConfig(),
            ...environmentResult,
            app_version: `${versionWithPrefix}-${this.config.helm_chart_service_name}`,
            chart_version: `${versionWithPrefix}-${this.config.helm_chart_service_name}-helm-charts`,
            branch,
        };
    }
    getDefaultConfig() {
        const { app_of_apps, app_of_apps_service_name, app_repo, dockerfile, ecr_repository_name, enable_tests, helm_chart_repo, helm_chart_service_name, name, service } = this.config;
        return { app_of_apps, app_of_apps_service_name, app_repo, dockerfile, ecr_repository_name, enable_tests, helm_chart_repo, helm_chart_service_name, name, service };
    }
}
exports.ManifestService = ManifestService;
//# sourceMappingURL=manifestService.js.map