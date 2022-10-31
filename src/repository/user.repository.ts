import { Logger } from "../util/logger";
import { PrismaClient, Role } from '@prisma/client'
import { User } from "../entity/user.model";
import { UserCreateDto } from "../entity/dto/user/user.create.dto";
import { UserUpdateDto } from "../entity/dto/user/user.update.dto";
import { UserPasswordUpdateDto } from "../entity/dto/user/user.password.update.dto";

export class UserRepository {

  public prisma: PrismaClient;
  private logger: Logger;
  private readonly ALL_ROLES: Role[] = [{ name: "ADMIN" }, { name: "WRITER" }, { name: "USER" }];

  public constructor() {
    this.prisma = new PrismaClient({ log: ['query', 'info'] });
    this.logger = new Logger();
  }

  public async findAll(): Promise<User[]> {
    this.logger.info("Getting all users from repository.");
    const mappedUsers: User[] = [];
    const users = await this.prisma.user.findMany({ include: { roles: true } });
    users.map((data) => mappedUsers.push({ id: data.id, name: data.name, password: data.password, roles: data.roles.map((role) => role.name) }))
    return mappedUsers;

  }

  public async findById(id: string): Promise<User> {
    this.logger.info(`Getting user with id ${id} from repository.`);
    const data = await this.prisma.user.findUniqueOrThrow({
      where: {
        id: id,
      },
      include: { roles: true }
    })
    return { id: data.id, name: data.name, password: data.password, roles: data.roles.map((role) => role.name) };
  }

  public async findByName(name: string): Promise<User> {
    this.logger.info(`Getting user with name ${name} from repository.`);
    const data = await this.prisma.user.findUniqueOrThrow({
      where: {
        name: name,
      },
      include: { roles: true }
    })
    return { id: data.id, name: data.name, password: data.password, roles: data.roles.map((role) => role.name) };
  }

  public async existsById(id: string): Promise<boolean> {
    this.logger.info(`Checking if user with id ${id} exists in repository.`);
    const answer = await this.prisma.user.count({ where: { id: id } })
    return answer != 0
  }

  public async create(dto: UserCreateDto): Promise<User> {
    this.logger.info(`Creating new user in repository.`);
    const mappedRoles: Role[] = []
    dto.roles.forEach(roles => mappedRoles.push({ name: roles }))
    try {
      await this.prisma.user.create(
        {
          data: {
            name: dto.name,
            roles: {
              connect: mappedRoles
            },
            password: dto.password
          }
        });
      const data = await this.prisma.user.findUniqueOrThrow({
        where: {
          name: dto.name,
        },
        include: { roles: true }
      })
      return { id: data.id, name: data.name, password: data.password, roles: data.roles.map((role) => role.name) };
    } catch (error) {
      this.logger.error(`Error in create: ${error}`)
      throw new Error("Error while creating: data already present in other user entity.");
    }
  }

  public async updateById(id: string, dto: UserUpdateDto): Promise<User> {
    this.logger.info(`Updating user with id ${id} in repository.`);
    const mappedRoles: Role[] = []
    dto.roles.forEach(roles => mappedRoles.push({ name: roles }))
    try {
      await this.prisma.user.update({
        where: { id: id },
        data: {
          name: dto.name,
          roles: {
            disconnect: this.ALL_ROLES,
            connect: mappedRoles
          }
        }
      })
      const data = await this.prisma.user.findUniqueOrThrow({
        where: {
          id: id,
        },
        include: { roles: true }
      })
      return { id: data.id, name: data.name, password: data.password, roles: data.roles.map((role) => role.name) };
    } catch (error) {
      this.logger.error(`Error in update: ${error}`)
      throw new Error("Error while updating: data already present in other user entity.");
    }
  }

  public async updatePasswordById(id: string, dto: UserPasswordUpdateDto): Promise<User> {
    this.logger.info(`Updating password of user with id ${id} in repository.`);
    try {
      await this.prisma.user.update({
        where: { id: id },
        data: {
          password: dto.password,
        }
      })
      const data = await this.prisma.user.findUniqueOrThrow({
        where: {
          id: id,
        },
        include: { roles: true }
      })
      return { id: data.id, name: data.name, password: data.password, roles: data.roles.map((role) => role.name) };
    } catch (error) {
      this.logger.error(`Error in update: ${error}`)
      throw new Error("Error while updating: data already present in other user entity.");
    }
  }

  public async deleteById(id: string): Promise<User> {
    this.logger.info(`Deleting user with id ${id} from repository.`);
    const data = await this.prisma.user.findUniqueOrThrow({
      where: {
        id: id,
      },
      include: { roles: true }
    })
    await this.prisma.user.delete({ where: { id: id } })
    return { id: data.id, name: data.name, password: data.password, roles: data.roles.map((role) => role.name) };
  }


}

