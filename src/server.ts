import Koa from "koa";
import * as HttpStatus from 'http-status-codes'
import cors from "koa-cors";
import json from "koa-json";
import bodyParser from 'koa-bodyparser';
import formidable from 'koa2-formidable';
import config from "config";
import { Logger } from "./util/logger";
import { ControllerInstaller } from "./controller/controller.installer";
import errorHandler from 'koa-better-error-handler';
import koa404Handler from 'koa-404-handler';
import queryParams from "koa-queryparams";
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
        origin: this.CORS_ORIGINS,
        headers: ['Accept', 'Content-Type', 'Authorization'],
        maxAge: this.CORS_MAX_AGE,
      }),
    );
    this.logger.info("Setting up middleware.")
    this.application.use(json());
    this.application.use(formidable());
    this.application.use(bodyParser())
    this.logger.info("Setting up error handling.");
    this.application.context.onerror = errorHandler();
    this.application.context.api = true;
    this.application.use(koa404Handler);
    this.application.use(queryParams)
    this.logger.info("Setting up routing.")
    this.controllerInstaller = new ControllerInstaller();
    this.controllerInstaller.installRoutes(this.application);
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

