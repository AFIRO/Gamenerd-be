import * as Koa from 'koa';
import Router from 'koa-router';
import { UserService } from '../service/user.service';
import { Logger } from '../util/logger';
import { validate, ValidatorOptions } from 'class-validator'
import { UserCreateDto } from '../entity/dto/user/user.create.dto';
import { UserUpdateDto } from '../entity/dto/user/user.update.dto';

export class UserController {
  private readonly PREFIX: string = '/users'
  private router: Router;
  private userService: UserService;
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
    this.userService = new UserService();
    this.logger = new Logger;
    //route definitions

    //read all
    this.router.get('/', async (ctx: Koa.Context) => {
      this.logger.info("GET request for all users made.")
      try {
        const data = await this.userService.findAll();
        ctx.body = { data }
        this.logger.info(`GET for all users.`)
      } catch (error) {
        ctx.throw(404, error)
      }
    })

    //read specific
    this.router.get('/:id', async (ctx: Koa.Context) => {
      this.logger.info(`GET request for user with id  ${ctx.params.id} made.`)
      try {
        const data = await this.userService.findById(ctx.params.id);
        ctx.body = { data }
        this.logger.info(`GET for user with id ${ctx.params.id} succesful.`)
      } catch (error) {
        ctx.throw(404, error)
      }
    })

    //create
    this.router.post('/', async (ctx: Koa.Context) => {
      this.logger.info(`POST request for user with data ${JSON.stringify(ctx.request.body)} made.`)
      const dto = new UserCreateDto(ctx.request.body)
      await validate(dto, this.ValidatorOptions)
        .then(async errors => {
          if (errors.length > 0) {
            this.logger.error(`validation failed. errors: ${errors}`);
            ctx.throw(400, new Error(errors.toString()))
          } else {
            this.logger.info('validation successful.');
            try {
              const data = await this.userService.create(dto);
              ctx.body = { data }
              this.logger.info(`CREATE for user with id ${data.id} succesful.`)
            } catch (error) {
              ctx.throw(400, error)
            }
          }
        });
    })

    //update
    this.router.put('/:id', async (ctx: Koa.Context) => {
      this.logger.info(`PUT request for user with id  ${ctx.params.id} and data ${ctx.request.body} made.`)
      const dto = new UserUpdateDto(ctx.request.body)
      await validate(dto, this.ValidatorOptions)
        .then(async errors => {
          if (errors.length > 0) {
            this.logger.error(`validation failed. errors: ${errors}`);
            ctx.throw(400, new Error(errors.toString()))
          } else {
            this.logger.info('validation successful.');
            try {
            const data = await this.userService.update(ctx.params.id, dto);
            ctx.body = { data }
            this.logger.info(`UPDATE for user with id ${ctx.params.id} succesful.`)
          } catch (error) {
            ctx.throw(400, error)
          }
          }
        });
    })

    //delete
    this.router.delete('/:id', async (ctx: Koa.Context) => {
      this.logger.info(`DELETE request for user with id  ${ctx.params.id} made.`)
      try {
      const data = await this.userService.delete(ctx.params.id);
      ctx.body = { data }
      this.logger.info(`DELETE for game with id ${ctx.params.id} succesful.`)
    } catch (error) {
      ctx.throw(404, error)
    }
    })
  }

  public installRoutesInParentRouter(parentRouter: Router) {
    this.logger.info("Installing user routing into main application router")
    parentRouter.use(this.router.routes()).use(this.router.allowedMethods());
  }
}