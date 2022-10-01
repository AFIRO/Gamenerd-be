import { GameCreateDto } from "../entity/dto/game/game.create.dto"
import { GameUpdateDto } from "../entity/dto/game/game.update.dto"
import { Logger } from "../util/logger";
import { PrismaClient } from '@prisma/client'
import { Game } from "../entity/game.model";


export class GameRepository {

  private prisma: PrismaClient;
  private logger: Logger;

  public constructor() {
    this.prisma = new PrismaClient({ log: ['query', 'info'] });
    this.logger = new Logger();
  }

  public async findAll(): Promise<Game[]> {
    this.logger.info("Getting all games from repository.");
    const games = await this.prisma.game.findMany();
    return games;

  }

  public async findById(id: string): Promise<Game> {
    this.logger.info(`Getting game with id ${id} from repository.`);
    
    const potentialGame = await this.prisma.game.findUnique({
      where: {
        id: id,
      },
    })
    return potentialGame;
  }

  public async existsById(id: string): Promise<boolean> {
    this.logger.info(`Checking if game with id ${id} exists in repository.`);
    const answer = await this.prisma.game.count({ where: { id: id } })
    return answer != 0
  }

  public async create(dto: GameCreateDto): Promise<Game> {
    this.logger.info(`Creating new game in repository.`);
    try {
      await this.prisma.game.create({ data: dto });
      const potentialGame = await this.prisma.game.findUnique({
        where: {
          name: dto.name,
        },
      })
      return potentialGame;
    } catch (error) {
      this.logger.error(`Error in create: ${error}`)
      throw new Error("Error while creating: data already present in other game entity.");
    }
  }

  public async updateById(id: string, dto: GameUpdateDto): Promise<Game> {
    this.logger.info(`Updating game with id ${id} in repository.`);
    try {
      await this.prisma.game.update({
        where: { id: id },
        data: dto
      })
      const potentialGame = await this.prisma.game.findUnique({
        where: {
          name: dto.name,
        },
      })
      return potentialGame;
    } catch (error) {
      this.logger.error(`Error in update: ${error}`)
      throw new Error("Error while updating: data already present in other game entity.");
    }
  }

  public async deleteById(id: string): Promise<Game> {
    this.logger.info(`Deleting game with id ${id} from repository.`);
    const potentialGame = await this.prisma.game.findUnique({
      where: {
        id: id,
      },
    })
    await this.prisma.game.delete({ where: { id: id } })
    return potentialGame;

  }

}
