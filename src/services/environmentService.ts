// environmentService.ts
import { Config, EnvironmentResult, EnvironmentPromotionPhase, Environment } from '../interfaces/manifests';

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

  private getEnvironment(environment: string): Environment | undefined {
    return this.config.environments[environment];
  }
}
