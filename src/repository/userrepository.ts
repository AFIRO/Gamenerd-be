import { SiteUserCreateDto } from "../entity/dto/siteuser/siteuser.create.dto"
import { SiteUserUpdateDto } from "../entity/dto/siteuser/siteuser.update.dto"
import { Logger } from "../util/logger";
import { PrismaClient } from '@prisma/client'

export class UserRepository{

private logger = new Logger();
private prisma = new PrismaClient();

public async findAll() {
  this.logger.info("Getting all users");
  const users = await this.prisma.user.findMany();
  return users;
  
}

public async findById(id: number) {
  this.logger.info(`Getting user with id ${id}.`);
  const potentialUser = this.prisma.user.findUniqueOrThrow({
    where: {
      id: id,
    },
  })
  return potentialUser;
}

public async create(dto: SiteUserCreateDto) {
  this.logger.info(`Creating new user.`);
  this.prisma.user.create({data:dto});
}

public async updateById(id: number, dto: SiteUserUpdateDto) {
  this.logger.info(`Updating user with id ${id}.`);
  this.prisma.user.update({
    where: {id:id},
    data: dto
  })
}

public async deleteById(id:number) {
  this.logger.info(`Deleting user with id ${id}.`);
  this.prisma.user.delete({where:{id:id}})
}
}

