import { ReviewCreateDto } from "../entity/dto/review/review.create.dto"
import { ReviewUpdateDto } from "../entity/dto/review/review.update.dto"
import { Logger } from "../util/logger";
import { PrismaClient } from '@prisma/client'

export class ReviewRepository {

private prisma = new PrismaClient();
private logger = new Logger();

public async findAll() {
  this.logger.info("Getting all reviews from repository.");
  const reviews = await this.prisma.review.findMany();
  return reviews;
  
}

public async findById(id: number) {
  this.logger.info(`Getting review with id ${id} from repository.`);
  const protentialReview = this.prisma.review.findUniqueOrThrow({
    where: {
      id: id,
    },
  })
  return protentialReview;
}

public async findAllByGame(gameId: number) {
  this.logger.info(`Getting all reviews for game with id ${gameId} from repository.`);
  const potentialReviewsForSpecificGame = this.prisma.review.findMany({
    where: {
      gameId: gameId,
    },
  })
  return potentialReviewsForSpecificGame;
}

public async findAllByWriter(writerId: number) {
  this.logger.info(`Getting all reviews written by writer with id ${writerId} from repository.`);
  const potentialReviewsForSpecificWriter = this.prisma.review.findMany({
    where: {
      writerId: writerId,
    },
  })
  return potentialReviewsForSpecificWriter;
}


public async create(dto: ReviewCreateDto) {
  this.logger.info(`Creating new review in repository.`);
  this.prisma.review.create({data:dto});
}

public async updateById(id: number, dto: ReviewUpdateDto) {
  this.logger.info(`Updating review with id ${id} in repository.`);
  this.prisma.review.update({
    where: {id:id},
    data: dto
  })
}

public async deleteById(id:number) {
  this.logger.info(`Deleting review with id ${id} from repository.`);
  this.prisma.review.delete({where:{id:id}})
}

}
