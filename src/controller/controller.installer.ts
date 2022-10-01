import { GameController } from "./game.controller";
import { HealthController } from "./health.controller";
import { NewsController } from "./news.controller";
import { ReviewController } from "./review.controller";
import { UserController } from "./user.controller";
import Koa from "koa";
import Router from "koa-router";

export class ControllerInstaller {
  private applicationRouter: Router;
  private controllers: any[];

  public constructor() {
    this.applicationRouter = new Router({ prefix: '/api', });
    this.controllers = [
      new HealthController(),
      new GameController(),
      new NewsController(),
      new ReviewController(),
      new UserController()];
  }

  public installRoutes(applicationContext: Koa) {
    this.controllers.forEach((controller) => {
      controller.installRoutesInParentRouter(this.applicationRouter)
    })
    applicationContext.use(this.applicationRouter.routes()).use(this.applicationRouter.allowedMethods());
  }
}