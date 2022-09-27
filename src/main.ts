import { Logger } from "./util/logging";

const koa = require('koa');
const config = require('config')
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const koaCors = require('@koa/cors');
const router = new Router();
const app = new koa();
const logger = new Logger()

app.use(bodyParser());
app.use(router.routes())
.use(router.allowedMethods());

const CURRENT_ENV = config.get('environment')
const LOG_LEVEL = config.get('log.level');

logger.info(`Current environment = ${CURRENT_ENV}`)
logger.info(`Logging level = ${LOG_LEVEL}`)
logger.error("This is an error message for testing.")
logger.info("Server started correctly.")

router.get('/api/games',
async(ctx) => ctx.body = "Ja, dat marcheert dus he");

app.listen(9000);