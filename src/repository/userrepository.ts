import { SiteUserCreateDto } from "../entity/dto/siteuser/siteuser.create.dto"
import { SiteUserUpdateDto } from "../entity/dto/siteuser/siteuser.update.dto"
import { Logger } from "../util/logger";
import { PrismaClient } from '@prisma/client'

export class UserRepository{

private logger = new Logger();
private prisma = new PrismaClient();

findAll = async () => {
  throw new Error("Not implemented yet.")
  
}

findById = async (id: number) => {
  throw new Error("Not implemented yet.")
}

create = async (dto: SiteUserCreateDto) => {
  throw new Error("Not implemented yet.")
}

updateById = async (Id: number, dto: SiteUserUpdateDto) => {
  throw new Error("Not implemented yet.")
}

deleteById =async (id:number) => {
  throw new Error("Not implemented yet.")
}
}

