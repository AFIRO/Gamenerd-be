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

public async findById(id: string): Promise<News> {
  this.logger.info(`Getting news with id ${id} from repository.`);
  const potentialNews = await this.prisma.news.findUnique({
    where: {
      id: id,
    },
  })
  return potentialNews;
}

public async existsById(id: string): Promise<boolean> {
  this.logger.info(`Checking if news with id ${id} exists in repository.`);
  const answer = await this.prisma.news.count({where:{id:id}})
  return answer != 0
}

public async findAllByGame(gameId: string) : Promise<News[]>{
  this.logger.info(`Getting all news for game with id ${gameId} from repository.`);
  const potentialNewsItemsForSpecificGame = await this.prisma.news.findMany({
    where: {
      gameId: gameId,
    },
  })
  return potentialNewsItemsForSpecificGame;
}

public async findAllByWriter(writerId: string): Promise<News[]> {
  this.logger.info(`Getting all news written by writer with id ${writerId} from repository.`);
  const potentialNewsItemsForSpecificWriter = await this.prisma.news.findMany({
    where: {
      writerId: writerId,
    },
  })
  return potentialNewsItemsForSpecificWriter;
}

public async create(dto: NewsCreateDto): Promise<News> {
  this.logger.info(`Creating new news item in repository.`);
  try {
  await this.prisma.news.create({data:dto});
  const potentialNewsItem = this.prisma.news.findUnique({
    where: {
      content: dto.content
    }
  })
  return potentialNewsItem;
} catch (error) {
  this.logger.error(`Error in create: ${error}`)
  throw new Error("Error while creating: data already present in other news entity.");
}
}

public async updateById(id: string, dto: NewsUpdateDto): Promise<News>  {
  this.logger.info(`Updating news item with id ${id} in repository.`);
  try {
  await this.prisma.news.update({
    where: {id:id},
    data: dto
  })
  const potentialNewsItem = await this.prisma.news.findUnique({
    where: {
      id: dto.id
    }
  })
  return potentialNewsItem;
} catch (error) {
  this.logger.error(`Error in update: ${error}`)
  throw new Error("Error while updating: data already present in other game entity.");
}
}

public async deleteById(id:string): Promise<News> {
  this.logger.info(`Deleting news item with id ${id} from repository.`);
  const potentialNewsItem = await this.prisma.news.findUnique({
    where: {
      id:id
    }
  })
  await this.prisma.news.delete({where:{id:id}})
  return potentialNewsItem;
}

}
