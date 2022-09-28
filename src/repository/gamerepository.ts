import { GameCreateDto } from "../entity/dto/game/game.create.dto"
import { GameUpdateDto } from "../entity/dto/game/game.update.dto"
import { Logger } from "../util/logger";
import { PrismaClient } from '@prisma/client'
import { Game } from "../entity/game.model";

export class GameRepository{

private prisma = new PrismaClient();
private logger = new Logger();

public async findAll() {
  this.logger.info("Getting all games");
  const games = await this.prisma.game.findMany();
  return games;
  
}

public async findById(id: number) {
  this.logger.info(`Getting game with id ${id}.`);
  const potentialGame = this.prisma.game.findUniqueOrThrow({
    where: {
      id: id,
    },
  })
  return potentialGame;
}

public async create(dto: GameCreateDto) {
  this.logger.info(`Creating new game.`);
  this.prisma.game.create(dto);
}

public async updateById(id: number, dto: GameUpdateDto) {
  this.logger.info(`Updating game with id ${id}.`);
  throw new Error("Not implemented yet.")
}

public async deleteById(id:number) {
  this.logger.info(`Deleting game with id ${id}.`);
  throw new Error("Not implemented yet.")
}

}
