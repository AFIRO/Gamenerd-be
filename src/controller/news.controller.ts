import * as Koa from 'koa';
import Router from 'koa-router';
import { Logger } from '../util/logger';
import { validate, ValidatorOptions } from 'class-validator'
import { NewsService } from '../service/news.service';
import { NewsCreateDto } from '../entity/dto/news/news.create.dto';
import { NewsUpdateDto } from '../entity/dto/news/news.update.dto';
import { AuthenticationService } from '../service/authentification.service';
import { Role } from '../entity/role.model';

export class NewsController {
  private readonly PREFIX: string = '/news'
  private router: Router;
  private newsService: NewsService;
  private logger: Logger;
  private authenticationService: AuthenticationService
  private readonly ValidatorOptions: ValidatorOptions =
    {
      forbidUnknownValues: true,
      stopAtFirstError: true,
      validationError: {
        target: false
      }
    }

  public constructor() {
    this.router = new Router({ prefix: this.PREFIX })
    this.newsService = new NewsService();
    this.logger = new Logger;
    this.authenticationService = new AuthenticationService();
    //route definitions

    //read all
    this.router.get('/', async (ctx: Koa.Context) => {
      this.logger.info("GET request for all news made.")
      try {
        await this.authenticationService.authentificate(ctx);
        const data = await this.newsService.findAll();
        ctx.body = data
        this.logger.info(`GET for all news succesful.`)
      } catch (error) {
        ctx.throw(400, error)
      }
    })

    //read all by writer
    this.router.get('/byWriter/:writerId', async (ctx: Koa.Context) => {
      this.logger.info(`GET request for all news by writer with id ${ctx.params.writerId} made.`)
      try {
        await this.authenticationService.authentificate(ctx);
        const writerId: string = ctx.params.writerId.toString();
        const data = await this.newsService.findAllByWriter(writerId);
        ctx.body = data
        this.logger.info(`GET for all news by writer with id ${ctx.params.writerId}  succesful.`)
      } catch (error) {
        ctx.throw(400, error)
      }
    })

    //read all by game
    this.router.get('/byGame/:gameId', async (ctx: Koa.Context) => {
      this.logger.info(`GET request for all news by game with id ${ctx.params.gameId} made.`)
      try {
        await this.authenticationService.authentificate(ctx);
        const gameId: string = ctx.params.gameId.toString();
        const data = await this.newsService.findAllByGame(gameId);
        ctx.body = data
        this.logger.info(`GET for all news by game with id ${ctx.params.gameId}  succesful.`)
      } catch (error) {
        ctx.throw(400, error)
      }
    })

    //read specific
    this.router.get('/:id', async (ctx: Koa.Context) => {
      this.logger.info(`GET request for news with id ${ctx.params.id} made.`)
      try {
        await this.authenticationService.authentificate(ctx);
        const data = await this.newsService.findById(ctx.params.id);
        ctx.body = data
        this.logger.info(`GET for news with id ${ctx.params.id} succesful.`)
      } catch (error) {
        ctx.throw(400, error)
      }
    })

    //create
    this.router.post('/', async (ctx: Koa.Context) => {
      this.logger.info(`POST request for news with data ${JSON.stringify(ctx.request.body)} made.`)
      const dto = new NewsCreateDto(ctx.request.body)
      await validate(dto, this.ValidatorOptions)
        .then(async errors => {
          if (errors.length > 0) {
            this.logger.error(`validation failed. errors: ${errors}`);
            ctx.throw(400, new Error(errors.toString()))
          } else {
            this.logger.info('validation successful.');
            try {
              await this.authenticationService.authentificate(ctx, Role.WRITER);
              const data = await this.newsService.create(dto);
              ctx.body = data
              ctx.status = 201
              this.logger.info(`CREATE for news with id ${data.id} succesful.`)
            } catch (error) {
              ctx.throw(400, error)
            }
          }
        });
    })

    //update
    this.router.put('/:id', async (ctx: Koa.Context) => {
      this.logger.info(`PUT request for news with id ${ctx.params.id} and data ${JSON.stringify(ctx.request.body)} made.`)
      const dto = new NewsUpdateDto(ctx.request.body)
      await validate(dto, this.ValidatorOptions)
        .then(async errors => {
          if (errors.length > 0) {
            this.logger.error(`validation failed. errors: ${errors}`);
            ctx.throw(400, new Error(errors.toString()))
          } else {
            this.logger.info('validation successful.');
            try {
              await this.authenticationService.authentificate(ctx, Role.WRITER);
              const data = await this.newsService.update(ctx.params.id, dto);
              ctx.body = data
              this.logger.info(`UPDATE for news with id ${ctx.params.id} succesful.`)
            } catch (error) {
              ctx.throw(400, error)
            }
          }
        });
    })

    //delete
    this.router.delete('/:id', async (ctx: Koa.Context) => {
      this.logger.info(`DELETE request for game with id ${ctx.params.id} made.`)
      try {
        await this.authenticationService.authentificate(ctx, Role.ADMIN);
        const data = await this.newsService.delete(ctx.params.id);
        ctx.body = data
        this.logger.info(`DELETE for news with id ${ctx.params.id} succesful.`)
      } catch (error) {
        ctx.throw(400, error)
      }
    })
  }

  public installRoutesInParentRouter(parentRouter: Router) {
    this.logger.info("Installing news routing into main application router")
    parentRouter.use(this.router.routes()).use(this.router.allowedMethods());
  }
}