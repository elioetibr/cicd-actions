"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentService = void 0;
/**
 * Service for retrieving environment data based on input environment
 */
class EnvironmentService {
    config;
    constructor(config) {
        this.config = config;
    }
    getEnvironmentData(inputEnvironment) {
        const promotionPhase = this.getPromotionPhase(inputEnvironment);
        const environment = this.getEnvironment(inputEnvironment);
        return promotionPhase && environment ? { ...environment, ...promotionPhase } : null;
    }
    getPromotionPhase(environment) {
        return Object.values(this.config.environment_promotion_phases).find(phase => phase.environment === environment);
    }
    getEnvironment(environment) {
        return this.config.environments[environment];
    }
}
exports.EnvironmentService = EnvironmentService;
//# sourceMappingURL=environmentService.js.map