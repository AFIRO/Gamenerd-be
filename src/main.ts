import { Server } from "./server";

const server: Server = new Server();

async function onClose() {
    await server.stop();
    process.exit(0);
}

try {
    process.on('SIGTERM', onClose);
    process.on('SIGQUIT', onClose);
    server.start();
} catch (error) {
    process.exit(-1)
}