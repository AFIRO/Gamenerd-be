import * as Koa from 'koa';
import Router from 'koa-router';
import * as HttpStatus from 'http-status-codes';
import { UserService } from '../service/user.service';
import { Logger } from '../util/logger';
import { GameUpdateDto } from '../entity/dto/game/game.update.dto';
import { GameCreateDto } from '../entity/dto/game/game.create.dto';
import { UserCreateDto } from '../entity/dto/user/user.create.dto';
import { UserUpdateDto } from '../entity/dto/user/user.update.dto';

export class UserController {
  private readonly PREFIX: string = '/users'
  private router: Router;
  private userService: UserService;
  private logger: Logger;

  public constructor(){
    this.router = new Router({prefix: this.PREFIX})
    this.userService = new UserService();
    this.logger = new Logger;
    //route definitions

    //read all
    this.router.get('/',async (ctx:Koa.Context) => {
      this.logger.info("GET request for all users made.")
      const data = await this.userService.findAll();
      ctx.body = {data}
    })

    //read specific
    this.router.get('/:id',async (ctx:Koa.Context) => {
      this.logger.info(`GET request for user ${ctx.params.id} made.`)
      const data = await this.userService.findById(ctx.params.id);
      ctx.body = {data}
    })

    //create
    this.router.post('/',async (ctx:Koa.Context) => {
      this.logger.info(`POST request for user with data ${ctx.request.body} made.`)
      const dto = new UserCreateDto(ctx.request.body)
      const data = await this.userService.create(dto);
      ctx.body = {data}
    })

    //update
    this.router.put('/:id',async (ctx:Koa.Context) => {
      this.logger.info(`PUT request for user ${ctx.params.id} and data ${ctx.request.body} made.`)
      const dto = new UserUpdateDto(ctx.request.body)
      const data = await this.userService.update(ctx.params.id, dto);
      ctx.body = {data}
    })

    //delete
    this.router.delete('/:id',async (ctx:Koa.Context) => {
      this.logger.info(`DELETE request for user ${ctx.params.id} made.`)
      const data = await this.userService.delete(ctx.params.id);
      ctx.body = {data}
    })
  }

  public installRoutesInParentRouter(parentRouter: Router){
    this.logger.info("Installing user routing into main application router")
    parentRouter.use(this.router.routes()).use(this.router.allowedMethods());
  }
}