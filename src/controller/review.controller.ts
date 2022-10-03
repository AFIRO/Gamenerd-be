import * as Koa from 'koa';
import Router from 'koa-router';
import { Logger } from '../util/logger';
import { validate, ValidatorOptions } from 'class-validator'
import { ReviewService } from '../service/review.service';
import { ReviewCreateDto } from '../entity/dto/review/review.create.dto';
import { ReviewUpdateDto } from '../entity/dto/review/review.update.dto';


export class ReviewController {
  private readonly PREFIX: string = '/reviews'
  private router: Router;
  private reviewService: ReviewService;
  private logger: Logger;
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
    this.reviewService = new ReviewService();
    this.logger = new Logger;
    //route definitions

    //read all
    this.router.get('/', async (ctx: Koa.Context) => {
      this.logger.info("GET request for all reviews made.")
      try {
        const data = await this.reviewService.findAll();
        ctx.body = { data }
        this.logger.info(`GET for all reviews succesful.`)
      } catch (error) {
        ctx.throw(404, error)
      }
    })

    //read all by writer
    this.router.get('/', async (ctx: Koa.Context) => {
      this.logger.info(`GET request for all reviews by writer with id ${ctx.query.writerId} made.`)
      try {
        const writerId: string = ctx.query.writerId.toString();
        const data = await this.reviewService.findAllByWriter(writerId);
        ctx.body = { data }
        this.logger.info(`GET for all reviews by writer with id ${ctx.query.writerId}  succesful.`)
      } catch (error) {
        ctx.throw(404, error)
      }
    })

    //read all by game
    this.router.get('/', async (ctx: Koa.Context) => {
      this.logger.info(`GET request for all reviews by game with id ${ctx.query.gameId} made.`)
      try {
        const gameId: string = ctx.query.gameId.toString();
        const data = await this.reviewService.findAllByGame(gameId);
        ctx.body = { data }
        this.logger.info(`GET for all reviews by game with id ${ctx.query.gameId}  succesful.`)
      } catch (error) {
        ctx.throw(404, error)
      }
    })

    //read specific
    this.router.get('/:id', async (ctx: Koa.Context) => {
      this.logger.info(`GET request for review with id ${ctx.params.id} made.`)
      try {
        const data = await this.reviewService.findById(ctx.params.id);
        ctx.body = { data }
        this.logger.info(`GET for review with id ${ctx.params.id} succesful.`)
      } catch (error) {
        ctx.throw(404, error)
      }
    })

    //create
    this.router.post('/', async (ctx: Koa.Context) => {
      this.logger.info(`POST request for review with data ${JSON.stringify(ctx.request.body)} made.`)
      const dto = new ReviewCreateDto(ctx.request.body)
      await validate(dto, this.ValidatorOptions)
        .then(async errors => {
          if (errors.length > 0) {
            this.logger.error(`validation failed. errors: ${errors}`);
            ctx.throw(400, new Error(errors.toString()))
          } else {
            this.logger.info('validation successful.');
            try {
              const data = await this.reviewService.create(dto);
              ctx.body = { data }
              this.logger.info(`CREATE for review with id ${data.id} succesful.`)
            } catch (error) {
              ctx.throw(400, error)
            }
          }
        });
    })

    //update
    this.router.put('/:id', async (ctx: Koa.Context) => {
      this.logger.info(`PUT request for news with id ${ctx.params.id} and data ${ctx.request.body} made.`)
      const dto = new ReviewUpdateDto(ctx.request.body)
      await validate(dto, this.ValidatorOptions)
        .then(async errors => {
          if (errors.length > 0) {
            this.logger.error(`validation failed. errors: ${errors}`);
            ctx.throw(400, new Error(errors.toString()))
          } else {
            this.logger.info('validation successful.');
            try {
              const data = await this.reviewService.update(ctx.params.id, dto);
              ctx.body = { data }
              this.logger.info(`UPDATE for review with id ${ctx.params.id} succesful.`)
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
        const data = await this.reviewService.delete(ctx.params.id);
        ctx.body = { data }
        this.logger.info(`DELETE for review with id ${ctx.params.id} succesful.`)
      } catch (error) {
        ctx.throw(404, error)
      }
    })
  }

  public installRoutesInParentRouter(parentRouter: Router) {
    this.logger.info("Installing review routing into main application router")
    parentRouter.use(this.router.routes()).use(this.router.allowedMethods());
  }
}