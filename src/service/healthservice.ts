const packageJson = require('../../package.json');
import { Logger } from "../util/logger";

export class HealthService{
private logger = new Logger();

ping = () => ({ pong: true });

getVersion = () =>{
  this.logger.info("Getting version info"); 
  return ({
  env: process.env.NODE_ENV,
  version: packageJson.version,
  name: packageJson.name,
})};
}