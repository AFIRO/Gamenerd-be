import { NewsCreateDto } from "../entity/dto/news/news.create.dto"
import { NewsUpdateDto } from "../entity/dto/news/news.update.dto"
import { Logger } from "../util/logging";
const logger = new Logger();

const findAll = async () => {
  throw new Error("Not implemented yet.")
  
}

const findById = async (id: number) => {
  throw new Error("Not implemented yet.")
}

const create = async (dto: NewsCreateDto) => {
  throw new Error("Not implemented yet.")
}

const updateById = async (Id: number, dto: NewsUpdateDto) => {
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