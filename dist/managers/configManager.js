"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigManager = void 0;
/**
 * ConfigManager class for managing configuration data.
 */
class ConfigManager {
    config;
    constructor(config) {
        this.config = config;
    }
    serialize() {
        return JSON.stringify(this.config, null, 2);
    }
    static deserialize(jsonString) {
        return JSON.parse(jsonString);
    }
}
exports.ConfigManager = ConfigManager;
//# sourceMappingURL=configManager.js.map