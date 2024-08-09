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
exports.EnvironmentService = void 0;
// environmentService.ts
const core = __importStar(require("@actions/core"));
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
    getEnvironment(selectedEnvironment) {
        const resultEnvironment = this.config.environments[selectedEnvironment];
        core.debug(`environment ${JSON.stringify(resultEnvironment)}`);
        const { cluster, approval_for_promotion, enabled, environment, next_environment, aws_region, with_gate } = resultEnvironment;
        return {
            cluster,
            approval_for_promotion,
            enabled,
            environment,
            next_environment,
            aws_region,
            with_gate
        };
    }
}
exports.EnvironmentService = EnvironmentService;
//# sourceMappingURL=environmentService.js.map