import { Logger } from "../util/logger";
import { PrismaClient } from '@prisma/client'
import { User } from "../entity/user.model";
import { UserCreateDto } from "../entity/dto/user/user.create.dto";
import { UserUpdateDto } from "../entity/dto/user/user.update.dto";

export class UserRepository{

  private prisma: PrismaClient;
  private logger: Logger;
  
  public constructor(){
    this.prisma = new PrismaClient({ log: ['query', 'info'] });
    this.logger = new Logger();
  }

public async findAll(): Promise<User[]>{
  this.logger.info("Getting all users from repository.");
  const users = await this.prisma.user.findMany();
  return users;
  
}

public async findById(id: number): Promise<User> {
  this.logger.info(`Getting user with id ${id} from repository.`);
  const potentialUser = this.prisma.user.findUniqueOrThrow({
    where: {
      id: id,
    },
  })
  return potentialUser;
}

public async create(dto: UserCreateDto): Promise<User> {
  this.logger.info(`Creating new user in repository.`);
  this.prisma.user.create({data:dto});
  const potentialUser = this.prisma.user.findUnique({
    where: {
      name: dto.name,
    },
  })
  return potentialUser;
}

public async updateById(id: number, dto: UserUpdateDto): Promise<User> {
  this.logger.info(`Updating user with id ${id} in repository.`);
  this.prisma.user.update({
    where: {id:id},
    data: dto
  })
  const potentialUser = this.prisma.user.findUnique({
    where: {
      id: id,
    },
  })
  return potentialUser;
}

public async deleteById(id:number): Promise<User> {
  this.logger.info(`Deleting user with id ${id} from repository.`);
  const potentialUser = this.prisma.user.findUniqueOrThrow({
    where: {
      id: id,
    },
  })
  this.prisma.user.delete({where:{id:id}})
  return potentialUser;
}
}

