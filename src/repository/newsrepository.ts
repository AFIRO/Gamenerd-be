import { NewsCreateDto } from "../entity/dto/news/news.create.dto"
import { NewsUpdateDto } from "../entity/dto/news/news.update.dto"
import { Logger } from "../util/logger";
import { PrismaClient } from '@prisma/client'
import { News } from "../entity/news.model";

export class NewsRepository {

private prisma = new PrismaClient();
private logger = new Logger();

public async findAll() {
  this.logger.info("Getting all news");
  const news = await this.prisma.news.findMany();
  return news;
  
}

public async findById(id: number) {
  this.logger.info(`Getting news with id ${id}.`);
  const potentialNews = this.prisma.news.findUniqueOrThrow({
    where: {
      id: id,
    },
  })
  return potentialNews;
}

public async create(dto: NewsCreateDto) {
  this.logger.info(`Creating new news.`);
  throw new Error("Not implemented yet.")
}

public async updateById(id: number, dto: NewsUpdateDto) {
  this.logger.info(`Updating news with id ${id}.`);
  throw new Error("Not implemented yet.")
}

public async deleteById(id:number) {
  this.logger.info(`Deleting news with id ${id}.`);
  throw new Error("Not implemented yet.")
}

}
