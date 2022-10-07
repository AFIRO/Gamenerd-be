import { Server } from "./server";

const server: Server = new Server();

try {
process.on('SIGTERM', server.stop);
process.on('SIGQUIT', server.stop);
server.start();
} catch(error) {
    process.exit(-1)
}