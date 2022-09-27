import { SiteUserCreateDto } from "../entity/dto/siteuser/siteuser.create.dto"
import { SiteUserUpdateDto } from "../entity/dto/siteuser/siteuser.update.dto"
import { Logger } from "../util/logging";
const logger = new Logger();

const findAll = async () => {
  throw new Error("Not implemented yet.")
  
}

const findById = async (id: number) => {
  throw new Error("Not implemented yet.")
}

const create = async (dto: SiteUserCreateDto) => {
  throw new Error("Not implemented yet.")
}

const updateById = async (Id: number, dto: SiteUserUpdateDto) => {
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