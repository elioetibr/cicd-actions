// manifestService.ts
import {
  Config,
  DefaultConfig, EnvironmentResult,
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
    const versionWithPrefix: string = ensureSemanticVersionPrefix(version)
    const environmentResult: EnvironmentResult | null = this.environmentService.getEnvironmentData(environment);

    if (!environmentResult) return null;

    return {
      ...this.getDefaultConfig(),
      ...environmentResult,
      app_version: `${versionWithPrefix}-${this.config.helm_chart_service_name}`,
      chart_version: `${versionWithPrefix}-${this.config.helm_chart_service_name}-helm-charts`,
      branch,
    };
  }

  private getDefaultConfig(): DefaultConfig {
    const { app_of_apps, app_of_apps_service_name, app_repo, dockerfile, ecr_repository_name, enable_tests, helm_chart_repo, helm_chart_service_name, name, service } = this.config;
    return { app_of_apps, app_of_apps_service_name, app_repo, dockerfile, ecr_repository_name, enable_tests, helm_chart_repo, helm_chart_service_name, name, service };
  }
}
