import * as Koa from 'koa';
import Router from 'koa-router';
import * as HttpStatus from 'http-status-codes';
import { GameService } from '../service/game.service';
import { Logger } from '../util/logger';
import { GameUpdateDto } from '../entity/dto/game/game.update.dto';
import { GameCreateDto } from '../entity/dto/game/game.create.dto';

export class GameController {
  private readonly PREFIX: string = '/games'
  private router: Router;
  private gameService: GameService;
  private logger: Logger;

  public constructor() {
    this.router = new Router({ prefix: '/games' })
    this.gameService = new GameService();
    this.logger = new Logger;
    //route definitions

    //read all
    this.router.get('/', async (ctx: Koa.Context) => {
      this.logger.info("GET request for all games made.")
      const data = await this.gameService.findAll();
      ctx.body = { data }
    })

    //read specific
    this.router.get('/:id', async (ctx: Koa.Context) => {
      this.logger.info(`GET request for game ${ctx.params.id} made.`)
      const data = await this.gameService.findById(ctx.params.id);
      ctx.body = { data }
    })

    //create
    this.router.post('/', async (ctx: Koa.Context) => {
      this.logger.info(`POST request for game with data ${ctx.request.body} made.`)
      const dto = new GameCreateDto(ctx.request.body)
      const data = await this.gameService.create(dto);
      ctx.body = { data }
    })

    //update
    this.router.put('/:id', async (ctx: Koa.Context) => {
      this.logger.info(`PUT request for game ${ctx.params.id} and data ${ctx.request.body} made.`)
      const dto = new GameUpdateDto(ctx.request.body)
      const data = await this.gameService.update(ctx.params.id, dto);
      ctx.body = { data }
    })

    //delete
    this.router.delete('/:id', async (ctx: Koa.Context) => {
      this.logger.info(`DELETE request for game ${ctx.params.id} made.`)
      const data = await this.gameService.delete(ctx.params.id);
      ctx.body = { data }
    })
  }

  public installRoutesInParentRouter(parentRouter: Router) {
    this.logger.info("Installing game routing into main application router")
    parentRouter.use(this.router.routes()).use(this.router.allowedMethods());
  }
}