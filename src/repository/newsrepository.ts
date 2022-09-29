import { NewsCreateDto } from "../entity/dto/news/news.create.dto"
import { NewsUpdateDto } from "../entity/dto/news/news.update.dto"
import { Logger } from "../util/logger";
import { PrismaClient } from '@prisma/client'

export class NewsRepository {

private prisma = new PrismaClient();
private logger = new Logger();

public async findAll() {
  this.logger.info("Getting all news from repository.");
  const news = await this.prisma.news.findMany();
  return news;
  
}

public async findById(id: number) {
  this.logger.info(`Getting news with id ${id} from repository.`);
  const potentialNews = this.prisma.news.findUniqueOrThrow({
    where: {
      id: id,
    },
  })
  return potentialNews;
}

public async findAllByGame(gameId: number) {
  this.logger.info(`Getting all news for game with id ${gameId} from repository.`);
  const potentialNewsItemsForSpecificGame = this.prisma.news.findMany({
    where: {
      gameId: gameId,
    },
  })
  return potentialNewsItemsForSpecificGame;
}

public async findAllByWriter(writerId: number) {
  this.logger.info(`Getting all news written by writer with id ${writerId} from repository.`);
  const potentialNewsItemsForSpecificWriter = this.prisma.news.findMany({
    where: {
      writerId: writerId,
    },
  })
  return potentialNewsItemsForSpecificWriter;
}

public async create(dto: NewsCreateDto) {
  this.logger.info(`Creating new news item in repository.`);
  this.prisma.news.create({data:dto});
}

public async updateById(id: number, dto: NewsUpdateDto) {
  this.logger.info(`Updating news item with id ${id} in repository.`);
  this.prisma.news.update({
    where: {id:id},
    data: dto
  })
}

public async deleteById(id:number) {
  this.logger.info(`Deleting news item with id ${id} from repository.`);
  this.prisma.news.delete({where:{id:id}})
}

}
