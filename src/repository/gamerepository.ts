import { GameCreateDto } from "../entity/dto/game/game.create.dto"
import { GameUpdateDto } from "../entity/dto/game/game.update.dto"
import { Logger } from "../util/logger";
import { PrismaClient } from '@prisma/client'
import { Game } from "../entity/game.model";

export class GameRepository{

private prisma: PrismaClient;
private logger: Logger;

public constructor(){
  this.prisma = new PrismaClient({ log: ['query', 'info'] });
  this.logger = new Logger();
}

public async findAll(): Promise<Game[]> {
  this.logger.info("Getting all games from repository.");
  const games = await this.prisma.game.findMany();
  return games;
  
}

public async findById(id: number): Promise<Game> {
  this.logger.info(`Getting game with id ${id} from repository.`);
  const potentialGame = this.prisma.game.findUniqueOrThrow({
    where: {
      id: id,
    },
  })
  return potentialGame;
}

public async create(dto: GameCreateDto): Promise<Game> {
  this.logger.info(`Creating new game in repository.`);
  this.prisma.game.create({data:dto});
  const potentialGame = this.prisma.game.findFirst({
    where: {
      name: dto.name,
    },
  })
  return potentialGame;
}

public async updateById(id: number, dto: GameUpdateDto): Promise<Game> {
  this.logger.info(`Updating game with id ${id} in repository.`);
  this.prisma.game.update({
    where: {id:id},
    data: dto
  })
  const potentialGame = this.prisma.game.findFirst({
    where: {
      name: dto.name,
    },
  })
  return potentialGame;
}

public async deleteById(id:number): Promise<Game> {
  this.logger.info(`Deleting game with id ${id} from repository.`);
  const potentialGame = this.prisma.game.findUnique({
    where: {
      id: id,
    },
  })
  this.prisma.game.delete({where:{id:id}})
  return potentialGame;
  
}

}
