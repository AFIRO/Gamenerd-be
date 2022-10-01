import { ReviewCreateDto } from "../entity/dto/reviewer/review.create.dto";
import { ReviewOutputDto } from "../entity/dto/reviewer/review.output.dto";
import { ReviewUpdateDto } from "../entity/dto/reviewer/review.update.dto";
import { Game } from "../entity/game.model";
import { Review } from "../entity/review.model";
import { User } from "../entity/user.model";
import { GameMapper } from "../mapper/game.mapper";
import { ReviewMapper } from "../mapper/review.mapper";
import { UserMapper } from "../mapper/user.mapper";
import { GameRepository } from "../repository/game.repository";
import { ReviewRepository } from "../repository/review.repository";
import { UserRepository } from "../repository/user.repository";
import { Logger } from "../util/logger";
import { ServiceError } from "../util/serviceError";

export class ReviewService {
    private logger: Logger;
    private gameRepository: GameRepository;
    private userRepositoy: UserRepository;
    private reviewRepository: ReviewRepository;

    public constructor() {
        this.logger = new Logger();
        this.gameRepository = new GameRepository();
        this.reviewRepository = new ReviewRepository();
        this.userRepositoy = new UserRepository()
    }

    public async findAll(): Promise<ReviewOutputDto[]> {
        this.logger.info(`ReviewService getting all reviews.`)
        const data: Review[] = await this.reviewRepository.findAll();
        if (data.length != 0) {
            const mappedData: ReviewOutputDto[] = []
            for (let review of data) {
                let mappedReview: ReviewOutputDto = await this.retrieveEntitiesToBeMappedAndMapToOutputDto(review);
                mappedData.push(mappedReview);
            }
            return mappedData
        } else {
            this.logger.error(`No reviews in database`)
            throw ServiceError.notFound(`No review in database`, { Error: "No data" })
        }
    }

    public async findById(id: string): Promise<ReviewOutputDto> {
        this.logger.info(`ReviewService getting game with id ${id}.`)
        const reviewEntity: Review = await this.reviewRepository.findById(id);
        if (reviewEntity) {
            return await this.retrieveEntitiesToBeMappedAndMapToOutputDto(reviewEntity);
        } else {
            this.logger.error(`Review with id ${id} not found in repository.`);
            throw ServiceError.notFound(`Review with ${id} not found in database`, { id })
        }
    }

    public async create(dto: ReviewCreateDto): Promise<ReviewOutputDto> {
        this.logger.info(`ReviewService creating new review.`)
        const reviewEntity: Review = await this.reviewRepository.create(dto);
        return await this.retrieveEntitiesToBeMappedAndMapToOutputDto(reviewEntity)
    }

    public async update(id: string, dto: ReviewUpdateDto): Promise<ReviewOutputDto> {
        this.logger.info(`ReviewService updating review with id ${id}.`)
        if (id != dto.id) {
            this.logger.error(`Update failed due to validation error. Id ${id} in request does not match the Id ${dto.id} in body.`)
            throw ServiceError.validationFailed(`Id ${id} in request does not match the Id ${dto.id} in body.`, { id })
        }
        const reviewEntity: Review = await this.reviewRepository.updateById(id, dto);
        return await this.retrieveEntitiesToBeMappedAndMapToOutputDto(reviewEntity)
    }

    public async delete(id: string): Promise<ReviewOutputDto> {
        this.logger.info(`NewsService deleting user with id ${id}.`)
        if (await this.reviewRepository.existsById(id)) {
            const reviewEntity: Review = await this.reviewRepository.deleteById(id);
            return await this.retrieveEntitiesToBeMappedAndMapToOutputDto(reviewEntity)
        } else {
            this.logger.error(`News with id ${id} not found in repository.`);
            throw ServiceError.notFound(`Review with ${id} not found in database`, { id })
        }
    }

    private async retrieveEntitiesToBeMappedAndMapToOutputDto(reviewEntity: Review): Promise<ReviewOutputDto> {
        let mappedReview: ReviewOutputDto;
        if (!await this.gameRepository.existsById(reviewEntity.gameId)) {
            throw ServiceError.notFound(`Game with ${reviewEntity.gameId} not found in database`, { id: reviewEntity.gameId })
        }
        if (!await this.userRepositoy.existsById(reviewEntity.writerId)) {
            throw ServiceError.notFound(`Writer with ${reviewEntity.writerId} not found in database`, { id: reviewEntity.writerId })
        }
        let game: Game = await this.gameRepository.findById(reviewEntity.gameId);
        let writer: User = await this.userRepositoy.findById(reviewEntity.writerId);
        mappedReview = ReviewMapper.toOutputDto(reviewEntity, UserMapper.toOutputDto(writer), GameMapper.toOutputDto(game));
        return mappedReview;
    }

}