import { ReviewCreateDto } from "../entity/dto/reviewer/review.create.dto"
import { ReviewUpdateDto } from "../entity/dto/reviewer/review.update.dto"
import { Logger } from "../util/logger";
import { PrismaClient } from '@prisma/client'

export class ReviewRepository {

private prisma = new PrismaClient();
private logger = new Logger();

public findAll = async () => {
  this.logger.info("Getting all reviews");
  return this.prisma.review.findMany();
  
}

public findById = async (id: number) => {
  throw new Error("Not implemented yet.")
}

public create = async (dto: ReviewCreateDto) => {
  throw new Error("Not implemented yet.")
}

public updateById = async (Id: number, dto: ReviewUpdateDto) => {
  throw new Error("Not implemented yet.")
}

public deleteById =async (id:number) => {
  throw new Error("Not implemented yet.")
}

}
