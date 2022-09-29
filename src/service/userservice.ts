import { UserCreateDto } from "../entity/dto/user/user.create.dto";
import { UserOutputDto } from "../entity/dto/user/user.output.dto";
import { UserUpdateDto } from "../entity/dto/user/user.update.dto";
import { UserMapper } from "../mapper/usermapper";
import { UserRepository } from "../repository/userrepository";
import { Logger } from "../util/logger";
import { ServiceError } from "../util/serviceError";

export class UserService {
  private logger: Logger;
  private userRepository: UserRepository

  public constructor() {
    this.logger = new Logger();
    this.userRepository = new UserRepository();
  }

  public async findAll(): Promise<UserOutputDto[]> {
    this.logger.info(`UserService getting all users.`)
    const data = await this.userRepository.findAll();
    if (data.length != 0) {
      return data.map(UserMapper.toOutputDto);
    }
    else
      throw ServiceError.notFound(`No users in database`, { Error: "No data" })
  }

  public async findById(id: number): Promise<UserOutputDto> {
    this.logger.info(`UserService getting user with id ${id}.`)
    const potentialGame = await this.userRepository.findById(id)
    if (!potentialGame) {
      this.logger.error(`User with id ${id} not found in repository.`);
      throw ServiceError.notFound(`User with id ${id} not found`, { id })
    }
    return UserMapper.toOutputDto(potentialGame);
  }

  public async create(dto: UserCreateDto): Promise<UserOutputDto> {
    this.logger.info(`UserService creating new user.`)
    return UserMapper.toOutputDto(await this.userRepository.create(dto));
  }

  public async update(id: number, dto: UserUpdateDto): Promise<UserOutputDto> {
    this.logger.info(`UserService updating user with id ${id}.`)
    if (id != dto.id) {
      this.logger.error(`Update failed due to validation error. Id ${id} in request does not match the Id ${dto.id} in body.`)
      throw ServiceError.validationFailed(`Id ${id} in request does not match the Id ${dto.id} in body.`, { id })
    }
    return UserMapper.toOutputDto(await this.userRepository.updateById(id, dto));
  }

  public async delete(id: number): Promise<UserOutputDto> {
    if (await this.userRepository.existsById(id)) {
      return UserMapper.toOutputDto(await this.userRepository.deleteById(id))
    } else {
      this.logger.error(`User with id ${id} not found in repository.`);
      throw ServiceError.notFound(`User with ${id} not found in database`, { id })
    }
  }
}