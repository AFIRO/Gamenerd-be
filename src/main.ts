const koa = require('koa');
const winston = require('winston')
const config = require('config')
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const koaCors = require('@koa/cors');
const router = new Router();
const app = new koa();

app.use(bodyParser());
app.use(router.routes())
.use(router.allowedMethods());

const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');
const CORS_ORIGINS = config.get('cors.origins');
const CORS_MAX_AGE = config.get('cors.maxAge');

console.log(`Logging level = ${LOG_LEVEL}`);

const logger = winston.createLogger({
  level:'info',
  format:winston.format.json(),
  defaultMeta:{service: 'user-service'},
  transports:[
    new winston.transports.File({filename:'error.log',level:'error'}),
    new winston.transports.File({filename:'all.log'}),
  ]
});

router.get('/api/games',
async(ctx) => ctx.body = "Ja, dat marcheert dus he");

app.listen(9000);