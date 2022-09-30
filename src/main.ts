import { Server } from "./server";
import { Logger } from "./util/logger";

const logger: Logger = new Logger();
const server: Server = new Server();

logger.info("Starting Server")
server.start();