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

public async findAllByGame(gameId: number) {
  this.logger.info(`Getting all news for game with id ${gameId}.`);
  const potentialNewsItemsForSpecificGame = this.prisma.news.findMany({
    where: {
      gameId: gameId,
    },
  })
  return potentialNewsItemsForSpecificGame;
}

public async findAllByWriter(writerId: number) {
  this.logger.info(`Getting all news written by writer with id ${writerId}.`);
  const potentialNewsItemsForSpecificWriter = this.prisma.news.findMany({
    where: {
      writerId: writerId,
    },
  })
  return potentialNewsItemsForSpecificWriter;
}

public async create(dto: NewsCreateDto) {
  this.logger.info(`Creating new news item.`);
  this.prisma.news.create({data:dto});
}

public async updateById(id: number, dto: NewsUpdateDto) {
  this.logger.info(`Updating news item with id ${id}.`);
  this.prisma.news.update({
    where: {id:id},
    data: dto
  })
}

public async deleteById(id:number) {
  this.logger.info(`Deleting news item with id ${id}.`);
  this.prisma.news.delete({where:{id:id}})
}

}
