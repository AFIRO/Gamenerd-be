const packageJson = require('../../package.json');
import { Logger } from "../util/logging";
const logger = new Logger();
export{}

const ping = () => ({ pong: true });

const getVersion = () =>{
  logger.info("Getting version info"); 
  return ({
  env: process.env.NODE_ENV,
  version: packageJson.version,
  name: packageJson.name,
})};

module.exports = {
  ping,
  getVersion,
};
