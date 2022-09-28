import { NewsCreateDto } from "../entity/dto/news/news.create.dto"
import { NewsUpdateDto } from "../entity/dto/news/news.update.dto"
import { Logger } from "../util/logger";
import { PrismaClient } from '@prisma/client'

export class NewsRepository {

private prisma = new PrismaClient();
private logger = new Logger();

public findAll = async () => {
  throw new Error("Not implemented yet.")
  
}

public findById = async (id: number) => {
  throw new Error("Not implemented yet.")
}

public create = async (dto: NewsCreateDto) => {
  throw new Error("Not implemented yet.")
}

public updateById = async (Id: number, dto: NewsUpdateDto) => {
  throw new Error("Not implemented yet.")
}

public deleteById =async (id:number) => {
  throw new Error("Not implemented yet.")
}

}
