import Koa from "koa";
import * as HttpStatus from 'http-status-codes'
import Router from "koa-router"
import cors from "koa-cors";
import json from "koa-json";
import BodyParser from 'koa-bodyparser';
import config from "config";
import { Logger } from "./util/logger";
import { ControllerInstaller } from "./controller/controller.installer";
export class Server {

  private readonly CURRENT_ENV = config.get('env');
  private readonly CORS_ORIGINS = config.get('cors.origins');
  private readonly CORS_MAX_AGE = config.get('cors.maxAge');
  private readonly PORT = config.get('port');
  private application: Koa;
  private logger: Logger;
  private controllerInstaller: ControllerInstaller

  public constructor() {
    this.logger = new Logger();
    this.logger.info(`Current environment = ${this.CURRENT_ENV}`)
    this.logger.info("Creating application context.")
    this.application = new Koa({env: this.CURRENT_ENV});
    this.logger.info("Setting cors configuration.")
    this.application.use(
      cors({
        origin: (ctx: Koa.Context) => {
          if (this.CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
            return ctx.request.header.origin;
          }
          return this.CORS_ORIGINS[0];
        },
        allowHeaders: ['Accept', 'Content-Type', 'Authorization'],
        maxAge: this.CORS_MAX_AGE,
      }),
    );
    this.logger.info("Setting up middleware.")
    this.application.use(json());
    this.logger.info("Setting up routing.")
    this.controllerInstaller = new ControllerInstaller();
    this.controllerInstaller.installRoutes(this.application);
    this.logger.info("Setting up error handler.")
    this.application.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
      try {
        await next();
      } catch (error) {
        ctx.status = error.statusCode || error.status || HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
        error.status = ctx.status;
        ctx.body = { error };
        this.logger.error(`${ctx.status}: ${ctx.body}`)
        ctx.app.emit('error', error, ctx);
      }
    });

  }

  public getApplicationContext(): Koa {
    return this.application;
  }

  public async start(): Promise<void>{
    return new Promise((resolve) => {
      const port = this.PORT || 9000;
      this.application.listen(port);
      this.logger.info(`🚀 Server listening on http://localhost:${port}`);
      resolve();
    });
  }

  public async stop(): Promise<void>{
    this.application.removeAllListeners();
  }
}

