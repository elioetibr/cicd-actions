/**
 * Represents the default configuration for an application.
 *
 * @interface DefaultConfig
 *
 * @property {string} app_of_apps - The name of the parent application.
 * @property {string} app_of_apps_service_name - The name of the service within the parent application.
 * @property {string} app_repo - The repository URL for the application.
 * @property {string} dockerfile - The Dockerfile for the application.
 * @property {string} ecr_repository_name - The name of the ECR repository for the application.
 * @property {string} helm_chart_repo - The repository URL for the Helm chart.
 * @property {string} helm_chart_service_name - The name of the service within the Helm chart.
 * @property {string} name - The name of the application.
 * @property {string} service - The name of the service.
 */
export interface DefaultConfig {
  app_of_apps: string;
  app_of_apps_service_name: string;
  app_repo: string;
  dockerfile: string;
  ecr_repository_name: string;
  enable_tests: boolean; // TODO: New
  helm_chart_repo: string;
  helm_chart_service_name: string;
  name: string;
  service: string;
}

/**
 * Represents a promotional phase for an environment in a specific AWS account.
 */
export interface EnvironmentPromotionPhase {
  aws_account_id: string;
  environment: string;
  description: string;
  enabled: boolean;
}

/**
 * Represents an environment configuration.
 *
 * @interface Environment
 */
export interface Environment {
  cluster: string;
  approval_for_promotion: boolean;
  enabled: boolean;
  environment: string;
  next_environment: string;
  aws_region: string;
  with_gate: boolean;
}

/**
 * Represents an environment configuration.
 *
 * @interface EnvironmentWithAdditionalRegion
 */
export interface EnvironmentWithAdditionalRegion extends Environment {
  additional_aws_regions: string[];
}

/**
 * Represents a configuration object.
 * @interface
 * @extends DefaultConfig
 */
export interface Config extends DefaultConfig {
  environment_promotion_phases: Record<string, EnvironmentPromotionPhase>;
  environments: Record<string, EnvironmentWithAdditionalRegion>;
}

/**
 * Represents the result of an environment with promotion phase.
 *
 * @interface
 * @extends Environment
 * @extends EnvironmentPromotionPhase
 */
export interface EnvironmentResult extends Environment, EnvironmentPromotionPhase {}



/**
 * Represents a manifest configuration for an application.
 *
 * @interface
 * @extends DefaultConfig
 * @extends EnvironmentPromotionPhase
 * @extends Environment
 */
export interface Manifest extends DefaultConfig, EnvironmentPromotionPhase, Environment {
  app_version: string;
  chart_version: string;
  branch: string;
}
