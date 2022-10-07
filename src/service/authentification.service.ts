import { LoginDataDto } from "../entity/dto/login/login.data.dto";
import { UserOutputDtoToken } from "../entity/dto/user/user.output.dto.token";
import { User } from "../entity/user.model";
import { UserMapper } from "../mapper/user.mapper";
import { UserRepository } from "../repository/user.repository";
import { JwtHelper } from "../util/jwt.utility";
import { Logger } from "../util/logger";
import { PasswordHasher } from "../util/password.hasher";
import * as Koa from 'koa';

export class AuthenticationService {
  public userRepository: UserRepository;
  private logger: Logger
  public passwordHasher: PasswordHasher
  public JwtHelper: JwtHelper

  public constructor(){
    this.userRepository = new UserRepository();
    this.logger = new Logger();
    this.passwordHasher = new PasswordHasher()
    this.JwtHelper = new JwtHelper()
  }

  public async login(dto: LoginDataDto): Promise<UserOutputDtoToken> {
    this.logger.info(`Attempting to login user with name ${dto.name}`);
    const user = await this.userRepository.findByName(dto.name);
    if (!user) {
      this.logger.error(`Login error: User with name ${dto.name} does not exist.`)
      throw new Error('The given name and password do not match');
    }

    const passwordValid = await this.passwordHasher.verifyPassword(dto.password, user.password);

    if (!passwordValid) {
      this.logger.error(`Login error: Password given for User with name ${dto.name} does not match with saved PasswordHash.`)
      throw new Error('The given email and password do not match');
    }
    this.logger.info(`Login for user with name ${dto.name} succesful.`);
    return await this.makeLoginData(user);
  };

  public async makeLoginData(user: User): Promise<UserOutputDtoToken> {
    this.logger.info(`Generating new JWT token for user with name ${user.name}.`);
    const token = await this.JwtHelper.generateJWT(user);
    return UserMapper.toOutputDtoToken(user, token);
  };

  public async authentificate(ctx: Koa.Context, roleRequired?: string){
    const authHeader = ctx.headers.authorization
    const {roles} = await this.checkAndParseSession(authHeader)
    if (roleRequired){
      this.checkifUserHasCorrectRoles(roleRequired, roles)
    }
  }

  private checkifUserHasCorrectRoles(roleRequired: string, userRoles: string[]): void{
    if (!userRoles.includes(roleRequired)){
      this.logger.error("Insufficient security clearance");
      throw new Error("You are not allowed to view this application.")
    }
  }

  private async checkAndParseSession(authHeader){
  if (!authHeader) {
      this.logger.error("User not signed in.");
      throw new Error('You need to be signed in');
    }
  
    if (!authHeader.startsWith('Bearer ')) {
      this.logger.error("Incorrect token.");
      throw new Error('Invalid authentication token');
    }
    const authToken = authHeader.substr(7);
    const {userId, roles} = await this.JwtHelper.verifyJWT(authToken);
		return {
      userId,
      roles,
			authToken,
		};
};
}

