import { GameCreateDto } from "../entity/dto/game/game.create.dto"
import { GameUpdateDto } from "../entity/dto/game/game.update.dto"
import { Logger } from "../util/logging";
const logger = new Logger();

const findAll = async () => {
  throw new Error("Not implemented yet.")
  
}

const findById = async (id: number) => {
  throw new Error("Not implemented yet.")
}

const create = async (dto: GameCreateDto) => {
  throw new Error("Not implemented yet.")
}

const updateById = async (Id: number, dto: GameUpdateDto) => {
  throw new Error("Not implemented yet.")
}

const deleteById =async (id:number) => {
  throw new Error("Not implemented yet.")
}


module.exports = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};