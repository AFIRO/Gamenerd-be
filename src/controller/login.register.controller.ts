import Router from "koa-router";
import { AuthenticationService} from "../service/authentification.service";
import { Logger } from "../util/logger";
import * as Koa from 'koa';
import { validate, ValidatorOptions } from "class-validator";
import { LoginDataDto } from "../entity/dto/login/login.data.dto";
import { UserService } from "../service/user.service";
import { UserCreateDto } from "../entity/dto/user/user.create.dto";

export class LoginAndRegistrationController {
  private router: Router;
  private authentificationService: AuthenticationService;
  private userService: UserService
  private logger: Logger;
  private readonly ValidatorOptions: ValidatorOptions =
  {
    forbidUnknownValues: true,
    stopAtFirstError: true,
    validationError: {
      target: false
    }
  }

  public constructor(){
    this.authentificationService = new AuthenticationService();
    this.userService = new UserService()
    this.logger = new Logger();
    this.router = new Router();
    
    //login endpoint
    this.router.post('/login', async (ctx: Koa.Context) => {
      this.logger.info(`LOGIN request for user with data ${JSON.stringify(ctx.request.body)} made.`)
      const dto = new LoginDataDto(ctx.request.body)
      await validate(dto, this.ValidatorOptions)
        .then(async errors => {
          if (errors.length > 0) {
            this.logger.error(`validation failed. errors: ${errors}`);
            ctx.throw(400, new Error(errors.toString()))
          } else {
            this.logger.info('validation successful.');
            try {
              const session = await this.authentificationService.login(dto)
              ctx.body = session;
              this.logger.info(`LOGIN for user with name ${dto.name} succesful.`)
            } catch (error) {
              ctx.throw(400, error)
            }
          }
        });
    })

        //register endpoint
        this.router.post('/register', async (ctx: Koa.Context) => {
          this.logger.info(`REGISTER request for user with data ${JSON.stringify(ctx.request.body)} made.`)
          const dto = new UserCreateDto(ctx.request.body)
          await validate(dto, this.ValidatorOptions)
            .then(async errors => {
              if (errors.length > 0) {
                this.logger.error(`validation failed. errors: ${errors}`);
                ctx.throw(400, new Error(errors.toString()))
              } else {
                this.logger.info('validation successful.');
                try {
                  const data = await this.userService.register(dto);
                  ctx.body = { data }
                  ctx.status = 201
                  this.logger.info(`REGISTER for user with id ${data.user.name} succesful.`)
                } catch (error) {
                  ctx.throw(400, error)
                }
              }
            });
        })

  }

  public installRoutesInParentRouter(parentRouter: Router) {
    this.logger.info("Installing login and registration routing into main application router")
    parentRouter.use(this.router.routes()).use(this.router.allowedMethods());
  }

}