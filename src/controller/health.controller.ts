import * as Koa from 'koa';
import Router from 'koa-router';
import { Logger } from '../util/logger';
import { HealthService } from '../service/health.service';

export class HealthController {
  private readonly PREFIX: string = '/health'
  private router: Router;
  private healthService: HealthService;
  private logger: Logger;

  public constructor() {
    this.router = new Router({ prefix: this.PREFIX })
    this.logger = new Logger()
    this.healthService = new HealthService()

    //ping
    this.router.get('/ping', (ctx: Koa.Context) => {
      this.logger.info(`PING request made by IP adress ${ctx.request.ip}`)
      ctx.status = 200
      ctx.body = this.healthService.ping()
    }
    )

    //read version info
    this.router.get('/info', (ctx: Koa.Context) => {
      this.logger.info(`Version info request made by IP adress ${ctx.request.ip}`)
      ctx.status = 200
      ctx.body = this.healthService.getVersion();
    }
    )
  }

  public installRoutesInParentRouter(parentRouter: Router) {
    this.logger.info("Installing health routing into main application router")
    parentRouter.use(this.router.routes()).use(this.router.allowedMethods());
  }
}