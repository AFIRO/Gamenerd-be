import { NewsCreateDto } from "../entity/dto/news/news.create.dto"
import { NewsUpdateDto } from "../entity/dto/news/news.update.dto"
import { Logger } from "../util/logging";

export class NewsRepository {

logger = new Logger();

findAll = async () => {
  throw new Error("Not implemented yet.")
  
}

findById = async (id: number) => {
  throw new Error("Not implemented yet.")
}

create = async (dto: NewsCreateDto) => {
  throw new Error("Not implemented yet.")
}

updateById = async (Id: number, dto: NewsUpdateDto) => {
  throw new Error("Not implemented yet.")
}

deleteById =async (id:number) => {
  throw new Error("Not implemented yet.")
}

}
