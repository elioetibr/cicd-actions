"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManifestService = void 0;
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
    getManifest(environment, app_version, chart_version, branch) {
        const environmentResult = this.environmentService.getEnvironmentData(environment);
        if (!environmentResult)
            return null;
        return {
            ...this.getDefaultConfig(),
            ...environmentResult,
            app_version,
            chart_version,
            branch,
        };
    }
    getDefaultConfig() {
        const { app_of_apps, app_of_apps_service_name, app_repo, dockerfile, ecr_repository_name, helm_chart_repo, helm_chart_service_name, name, service } = this.config;
        return { app_of_apps, app_of_apps_service_name, app_repo, dockerfile, ecr_repository_name, helm_chart_repo, helm_chart_service_name, name, service };
    }
}
exports.ManifestService = ManifestService;
//# sourceMappingURL=manifestService.js.map