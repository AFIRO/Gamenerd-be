import { NewsCreateDto } from "../entity/dto/news/news.create.dto"
import { NewsUpdateDto } from "../entity/dto/news/news.update.dto"
import { Logger } from "../util/logger";
import { PrismaClient } from '@prisma/client'
import { News } from "../entity/news.model";

export class NewsRepository {

  private prisma: PrismaClient;
  private logger: Logger;
  
  public constructor(){
    this.prisma = new PrismaClient({ log: ['query', 'info'] });
    this.logger = new Logger();
  }

public async findAll() : Promise<News[]>{
  this.logger.info("Getting all news from repository.");
  const news = await this.prisma.news.findMany();
  return news;
  
}

public async findById(id: number): Promise<News> {
  this.logger.info(`Getting news with id ${id} from repository.`);
  const potentialNews = this.prisma.news.findUniqueOrThrow({
    where: {
      id: id,
    },
  })
  return potentialNews;
}

public async findAllByGame(gameId: number) : Promise<News[]>{
  this.logger.info(`Getting all news for game with id ${gameId} from repository.`);
  const potentialNewsItemsForSpecificGame = this.prisma.news.findMany({
    where: {
      gameId: gameId,
    },
  })
  return potentialNewsItemsForSpecificGame;
}

public async findAllByWriter(writerId: number): Promise<News[]> {
  this.logger.info(`Getting all news written by writer with id ${writerId} from repository.`);
  const potentialNewsItemsForSpecificWriter = this.prisma.news.findMany({
    where: {
      writerId: writerId,
    },
  })
  return potentialNewsItemsForSpecificWriter;
}

public async create(dto: NewsCreateDto): Promise<News> {
  this.logger.info(`Creating new news item in repository.`);
  this.prisma.news.create({data:dto});
  const potentialNewsItem = this.prisma.news.findFirst({
    where: {
      content: dto.content
    }
  })
  return potentialNewsItem;
}

public async updateById(id: number, dto: NewsUpdateDto): Promise<News>  {
  this.logger.info(`Updating news item with id ${id} in repository.`);
  this.prisma.news.update({
    where: {id:id},
    data: dto
  })
  const potentialNewsItem = this.prisma.news.findFirst({
    where: {
      id: dto.id
    }
  })
  return potentialNewsItem;
}

public async deleteById(id:number): Promise<News> {
  this.logger.info(`Deleting news item with id ${id} from repository.`);
  const potentialNewsItem = this.prisma.news.findFirst({
    where: {
      id:id
    }
  })
  this.prisma.news.delete({where:{id:id}})
  return potentialNewsItem;
}

}
