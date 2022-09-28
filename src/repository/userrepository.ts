import { SiteUserCreateDto } from "../entity/dto/siteuser/siteuser.create.dto"
import { SiteUserUpdateDto } from "../entity/dto/siteuser/siteuser.update.dto"
import { Logger } from "../util/logger";
import { PrismaClient } from '@prisma/client'

export class UserRepository{

private logger = new Logger();
private prisma = new PrismaClient();

public findAll = async () => {
  throw new Error("Not implemented yet.")
  
}

public findById = async (id: number) => {
  throw new Error("Not implemented yet.")
}

public create = async (dto: SiteUserCreateDto) => {
  throw new Error("Not implemented yet.")
}

public updateById = async (Id: number, dto: SiteUserUpdateDto) => {
  throw new Error("Not implemented yet.")
}

public deleteById =async (id:number) => {
  throw new Error("Not implemented yet.")
}
}

