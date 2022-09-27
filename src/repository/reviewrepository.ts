import { ReviewCreateDto } from "../entity/dto/reviewer/review.create.dto"
import { ReviewUpdateDto } from "../entity/dto/reviewer/review.update.dto"


const findAll = async () => {
  throw new Error("Not implemented yet.")
  
}

const findById = async (id: number) => {
  throw new Error("Not implemented yet.")
}

const create = async (dto: ReviewCreateDto) => {
  throw new Error("Not implemented yet.")
}

const updateById = async (Id: number, dto: ReviewUpdateDto) => {
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