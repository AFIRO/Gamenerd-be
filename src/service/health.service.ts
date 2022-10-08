// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../../package.json');
import { Logger } from "../util/logger";

export class HealthService {
  private logger = new Logger();

  public ping() {
    this.logger.info("Resolving ping")
    return { pong: true }}

  public getVersion() {
    this.logger.info("Getting version info");
    return ({
      env: process.env.NODE_ENV,
      version: packageJson.version,
      name: packageJson.name,
    })
  }
}