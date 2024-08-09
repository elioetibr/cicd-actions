import { Config } from '../interfaces/manifests'

/**
 * ConfigManager class for managing configuration data.
 */
export class ConfigManager {
  constructor(private config: Config) {}

  serialize(): string {
    return JSON.stringify(this.config, null, 2);
  }

  static deserialize(jsonString: string): Config {
    return JSON.parse(jsonString);
  }
}
