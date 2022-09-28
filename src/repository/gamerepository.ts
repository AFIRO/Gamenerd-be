import { GameCreateDto } from "../entity/dto/game/game.create.dto"
import { GameUpdateDto } from "../entity/dto/game/game.update.dto"
import { Logger } from "../util/logger";
import { PrismaClient } from '@prisma/client'

export class GameRepository{

private prisma = new PrismaClient();
private logger = new Logger();

public findAll = async () => {
  this.logger.info("Getting all games");
  const games = await this.prisma.game.findMany();
  return games;
  
}

public findById = async (id: number) => {
  throw new Error("Not implemented yet.")
}

public create = async (dto: GameCreateDto) => {
  throw new Error("Not implemented yet.")
}

public updateById = async (Id: number, dto: GameUpdateDto) => {
  throw new Error("Not implemented yet.")
}

public deleteById =async (id:number) => {
  throw new Error("Not implemented yet.")
}

}
