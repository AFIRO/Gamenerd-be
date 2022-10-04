import * as Koa from 'koa';
import Router from 'koa-router';
import { GameService } from '../service/game.service';
import { Logger } from '../util/logger';
import { GameUpdateDto } from '../entity/dto/game/game.update.dto';
import { GameCreateDto } from '../entity/dto/game/game.create.dto';
import { validate, ValidatorOptions } from 'class-validator'
import { AuthenticationService } from '../service/authentification.service';
import { Role } from '../entity/Role';

export class GameController {
  private readonly PREFIX: string = '/games'
  private router: Router;
  private gameService: GameService;
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
    this.gameService = new GameService();
    this.logger = new Logger;
    this.authenticationService = new AuthenticationService();
    //route definitions

    //read all
    this.router.get('/', async (ctx: Koa.Context) => {
      this.logger.info("GET request for all games made.")
      try {
        this.authenticationService.authentificateToken(ctx);
        this.authenticationService.checkClearance(Role.ADMIN, ctx)
        const data = await this.gameService.findAll();
        ctx.body = { data }
        this.logger.info(`GET for all games.`)
      } catch (error) {
        ctx.throw(404, error)
      }
    })

    //read specific
    this.router.get('/:id', async (ctx: Koa.Context) => {
      this.logger.info(`GET request for game with id ${ctx.params.id} made.`)
      try {
        this.authenticationService.authentificateToken(ctx);
        const data = await this.gameService.findById(ctx.params.id);
        ctx.body = { data }
        this.logger.info(`GET for game with id ${ctx.params.id} succesful.`)
      } catch (error) {
        ctx.throw(404, error)
      }
    })

    //create
    this.router.post('/', async (ctx: Koa.Context) => {
      this.logger.info(`POST request for game with data ${JSON.stringify(ctx.request.body)} made.`)
      const dto = new GameCreateDto(ctx.request.body)
      await validate(dto, this.ValidatorOptions)
        .then(async errors => {
          if (errors.length > 0) {
            this.logger.error(`validation failed. errors: ${errors}`);
            ctx.throw(400, new Error(errors.toString()))
          } else {
            this.logger.info('validation successful.');
            try {
              this.authenticationService.authentificateToken(ctx);
              this.authenticationService.checkClearance(Role.ADMIN, ctx)
              const data = await this.gameService.create(dto);
              ctx.body = { data }
              this.logger.info(`CREATE for game with id ${data.id} succesful.`)
            } catch (error) {
              ctx.throw(400, error)
            }
          }
        });
    })

    //update
    this.router.put('/:id', async (ctx: Koa.Context) => {
      this.logger.info(`PUT request for game with id  ${ctx.params.id} and data ${ctx.request.body} made.`)
      const dto = new GameUpdateDto(ctx.request.body)
      await validate(dto, this.ValidatorOptions)
        .then(async errors => {
          if (errors.length > 0) {
            this.logger.error(`validation failed. errors: ${errors}`);
            ctx.throw(400, new Error(errors.toString()))
          } else {
            this.logger.info('validation successful.');
            try {
            this.authenticationService.authentificateToken(ctx);
             this.authenticationService.checkClearance(Role.ADMIN, ctx)
            const data = await this.gameService.update(ctx.params.id, dto);
            ctx.body = { data }
            this.logger.info(`UPDATE for game with id ${ctx.params.id} succesful.`)
          } catch (error) {
            ctx.throw(400, error)
          }
          }
        });
    })

    //delete
    this.router.delete('/:id', async (ctx: Koa.Context) => {
      this.logger.info(`DELETE request for game with id  ${ctx.params.id} made.`)
      try {
      this.authenticationService.authentificateToken(ctx);
      this.authenticationService.checkClearance(Role.ADMIN, ctx)
      const data = await this.gameService.delete(ctx.params.id);
      ctx.body = { data }
      this.logger.info(`DELETE for game with id ${ctx.params.id} succesful.`)
    } catch (error) {
      ctx.throw(404, error)
    }
    })
  }

  public installRoutesInParentRouter(parentRouter: Router) {
    this.logger.info("Installing game routing into main application router")
    parentRouter.use(this.router.routes()).use(this.router.allowedMethods());
  }
}