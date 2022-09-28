import { ReviewCreateDto } from "../entity/dto/reviewer/review.create.dto"
import { ReviewUpdateDto } from "../entity/dto/reviewer/review.update.dto"
import { Logger } from "../util/logger";
import { PrismaClient } from '@prisma/client'

export class ReviewRepository {

private prisma = new PrismaClient();
private logger = new Logger();

findAll = async () => {
  this.logger.info("Getting all reviews");
  return this.prisma.review.findMany();
  
}

findById = async (id: number) => {
  throw new Error("Not implemented yet.")
}

create = async (dto: ReviewCreateDto) => {
  throw new Error("Not implemented yet.")
}

updateById = async (Id: number, dto: ReviewUpdateDto) => {
  throw new Error("Not implemented yet.")
}

deleteById =async (id:number) => {
  throw new Error("Not implemented yet.")
}

}
