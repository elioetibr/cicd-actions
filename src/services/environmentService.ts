// environmentService.ts
import * as core from '@actions/core';
import {
  Config,
  EnvironmentResult,
  EnvironmentPromotionPhase,
  Environment, DefaultConfig
} from '../interfaces/manifests'

/**
 * Service for retrieving environment data based on input environment
 */
export class EnvironmentService {
  constructor(private config: Config) {}

  getEnvironmentData(inputEnvironment: string): EnvironmentResult | null {
    const promotionPhase = this.getPromotionPhase(inputEnvironment);
    const environment = this.getEnvironment(inputEnvironment);

    return promotionPhase && environment ? { ...environment, ...promotionPhase } : null;
  }

  private getPromotionPhase(environment: string): EnvironmentPromotionPhase | undefined {
    return Object.values(this.config.environment_promotion_phases).find(
      phase => phase.environment === environment
    );
  }

  private getEnvironment(selectedEnvironment: string): Environment | undefined {
      const resultEnvironment: Environment = this.config.environments[selectedEnvironment] as Environment;
      core.debug(`environment ${JSON.stringify(resultEnvironment)}`);
      const {
        cluster,
        approval_for_promotion,
        enabled,
        environment,
        next_environment,
        aws_region,
        with_gate
      }: Environment = resultEnvironment;
      return {
        cluster,
        approval_for_promotion,
        enabled,
        environment,
        next_environment,
        aws_region,
        with_gate
      }
  }
}
