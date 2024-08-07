// manifestService.ts
import {
  Config,
  DefaultConfig,
  Manifest
} from '../interfaces/manifests'
import { EnvironmentService } from './environmentService'
import { ensureSemanticVersionPrefix } from '../functions'

/**
 * Represents a service for getting a manifest.
 */
export class ManifestService {
  constructor(private config: Config, private environmentService: EnvironmentService) {}

  getManifest(
    environment: string,
    version: string,
    branch: string
  ): Manifest | null {
    const versionWithPrefix = ensureSemanticVersionPrefix(version)
    const environmentResult = this.environmentService.getEnvironmentData(environment);

    if (!environmentResult) return null;

    return {
      ...this.getDefaultConfig(),
      ...environmentResult,
      app_version: versionWithPrefix,
      chart_version: `${versionWithPrefix}-helm-charts`,
      branch,
    };
  }

  private getDefaultConfig(): DefaultConfig {
    const { app_of_apps, app_of_apps_service_name, app_repo, dockerfile, ecr_repository_name, helm_chart_repo, helm_chart_service_name, name, service } = this.config;
    return { app_of_apps, app_of_apps_service_name, app_repo, dockerfile, ecr_repository_name, helm_chart_repo, helm_chart_service_name, name, service };
  }
}
