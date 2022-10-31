import { ReviewCreateDto } from "../entity/dto/review/review.create.dto"
import { ReviewUpdateDto } from "../entity/dto/review/review.update.dto"
import { Logger } from "../util/logger";
import { Review } from "../entity/review.model";
import { PrismaClient } from "@prisma/client";
export class ReviewRepository {

  public prisma: PrismaClient;
  private logger: Logger;

  public constructor() {
    this.prisma = new PrismaClient({ log: ['query', 'info'] });
    this.logger = new Logger();
  }

  public async findAll(): Promise<Review[]> {
    this.logger.info("Getting all reviews from repository.");
    const reviews = await this.prisma.review.findMany();
    return reviews;

  }

  public async findById(id: string): Promise<Review> {
    this.logger.info(`Getting review with id ${id} from repository.`);
    const protentialReview = await this.prisma.review.findUniqueOrThrow({
      where: {
        id: id,
      },
    })
    return protentialReview;
  }

  public async existsById(id: string): Promise<boolean> {
    this.logger.info(`Checking if review with id ${id} exists in repository.`);
    const answer = await this.prisma.review.count({ where: { id: id } })
    return answer != 0
  }

  public async findAllByGame(gameId: string): Promise<Review[]> {
    this.logger.info(`Getting all reviews for game with id ${gameId} from repository.`);
    const potentialReviewsForSpecificGame = await this.prisma.review.findMany({
      where: {
        gameId: gameId,
      },
    })
    return potentialReviewsForSpecificGame;
  }

  public async findAllByWriter(writerId: string): Promise<Review[]> {
    this.logger.info(`Getting all reviews written by writer with id ${writerId} from repository.`);
    const potentialReviewsForSpecificWriter = await this.prisma.review.findMany({
      where: {
        writerId: writerId,
      },
    });
    return potentialReviewsForSpecificWriter;
  }


  public async create(dto: ReviewCreateDto): Promise<Review> {
    this.logger.info(`Creating new review in repository.`);
    try {
      await this.prisma.review.create({ data: dto });
      const protentialReview = await this.prisma.review.findUniqueOrThrow({
        where: {
          content: dto.content,
        },
      });
      return protentialReview;
    } catch (error) {
      this.logger.error(`Error in create: ${error}`)
      throw new Error("Error while creating: data already present in other review entity.");
    }
  }

  public async updateById(id: string, dto: ReviewUpdateDto): Promise<Review> {
    this.logger.info(`Updating review with id ${id} in repository.`);
    try {
      await this.prisma.review.update({
        where: { id: id },
        data: dto
      });
      const protentialReview = await this.prisma.review.findUniqueOrThrow({
        where: {
          id: id,
        },
      });
      return protentialReview;
    } catch (error) {
      this.logger.error(`Error in create: ${error}`)
      throw new Error("Error while updating: data already present in other review entity.");
    }
  }

  public async deleteById(id: string): Promise<Review> {
    this.logger.info(`Deleting review with id ${id} from repository.`);
    const protentialReview = await this.prisma.review.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    await this.prisma.review.delete({ where: { id: id } })
    return protentialReview;
  }
}
