import { ReviewCreateDto } from "../entity/dto/review/review.create.dto"
import { ReviewUpdateDto } from "../entity/dto/review/review.update.dto"
import { Logger } from "../util/logger";
import { PrismaClient } from '@prisma/client'
import { Review } from "../entity/review.model";

export class ReviewRepository {

private prisma = new PrismaClient();
private logger = new Logger();

public async findAll() {
  this.logger.info("Getting all reviews");
  const reviews = await this.prisma.review.findMany();
  return reviews;
  
}

public async findById(id: number) {
  this.logger.info(`Getting review with id ${id}.`);
  const protentialReview = this.prisma.review.findUniqueOrThrow({
    where: {
      id: id,
    },
  })
  return protentialReview;
}

public async create(dto: ReviewCreateDto) {
  this.logger.info(`Creating new review.`);
  throw new Error("Not implemented yet.")
}

public async updateById(id: number, dto: ReviewUpdateDto) {
  this.logger.info(`Updating review with id ${id}.`);
  throw new Error("Not implemented yet.")
}

public async deleteById(id:number) {
  this.logger.info(`Deleting review with id ${id}.`);
  this.prisma.review.delete({where:{id:id}})
}

}
