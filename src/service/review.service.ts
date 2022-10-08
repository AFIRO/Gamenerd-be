import { ReviewCreateDto } from "../entity/dto/review/review.create.dto";
import { ReviewOutputDto } from "../entity/dto/review/review.output.dto";
import { ReviewUpdateDto } from "../entity/dto/review/review.update.dto";
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

export class ReviewService {
    private logger: Logger;
    public gameRepository: GameRepository;
    public userRepositoy: UserRepository;
    public reviewRepository: ReviewRepository;

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
            throw Error(`No review in database`)
        }
    }

    
    public async findAllByGame(gameId: string): Promise<ReviewOutputDto[]> {
        this.logger.info(`ReviewService getting all reviews.`)
        const data: Review[] = await this.reviewRepository.findAllByGame(gameId);
        if (data.length != 0) {
            const mappedData: ReviewOutputDto[] = []
            for (let review of data) {
                let mappedReview: ReviewOutputDto = await this.retrieveEntitiesToBeMappedAndMapToOutputDto(review);
                mappedData.push(mappedReview);
            }
            return mappedData
        } else {
            this.logger.error(`No reviews in database found for game with id ${gameId}`)
            throw Error(`No reviews in database found for game with id ${gameId}`)
        }
    }

    public async findAllByWriter(writerId: string): Promise<ReviewOutputDto[]> {
        this.logger.info(`ReviewService getting all reviews.`)
        const data: Review[] = await this.reviewRepository.findAllByWriter(writerId);
        if (data.length != 0) {
            const mappedData: ReviewOutputDto[] = []
            for (let review of data) {
                let mappedReview: ReviewOutputDto = await this.retrieveEntitiesToBeMappedAndMapToOutputDto(review);
                mappedData.push(mappedReview);
            }
            return mappedData
        } else {
            this.logger.error(`No reviews in database found written by writer with with id ${writerId}`)
            throw Error(`No reviews in database found written by writer with id ${writerId}`)
        }
    }

    public async findById(id: string): Promise<ReviewOutputDto> {
        this.logger.info(`ReviewService getting game with id ${id}.`)
        const reviewEntity: Review = await this.reviewRepository.findById(id);
        if (reviewEntity) {
            return await this.retrieveEntitiesToBeMappedAndMapToOutputDto(reviewEntity);
        } else {
            this.logger.error(`Review with id ${id} not found in repository.`);
            throw Error(`Review with ${id} not found in database`)
        }
    }

    public async create(dto: ReviewCreateDto): Promise<ReviewOutputDto> {
        this.logger.info(`ReviewService creating new review.`)
        this.validateExistenceOfPassedWritersAndGames(dto)
        const reviewEntity: Review = await this.reviewRepository.create(dto);
        return await this.retrieveEntitiesToBeMappedAndMapToOutputDto(reviewEntity)
    }

    public async update(id: string, dto: ReviewUpdateDto): Promise<ReviewOutputDto> {
        this.logger.info(`ReviewService updating review with id ${id}.`)
        if (id != dto.id) {
            this.logger.error(`Update failed due to validation error. Id ${id} in request does not match the Id ${dto.id} in body.`)
            throw Error(`Id ${id} in request does not match the Id ${dto.id} in body.`)
        }
        this.validateExistenceOfPassedWritersAndGames(dto)
        const reviewEntity: Review = await this.reviewRepository.updateById(id, dto);
        return await this.retrieveEntitiesToBeMappedAndMapToOutputDto(reviewEntity)
    }

    public async delete(id: string): Promise<ReviewOutputDto> {
        this.logger.info(`ReviewService deleting review with id ${id}.`)
        if (await this.reviewRepository.existsById(id)) {
            const reviewEntity: Review = await this.reviewRepository.deleteById(id);
            return await this.retrieveEntitiesToBeMappedAndMapToOutputDto(reviewEntity)
        } else {
            this.logger.error(`Review with id ${id} not found in repository.`);
            throw Error(`Review with ${id} not found in database`)
        }
    }

    private async validateExistenceOfPassedWritersAndGames(createDto?: ReviewCreateDto, updateDto?: ReviewUpdateDto) {
        if (createDto){
            if (!await this.gameRepository.existsById(createDto.gameId)) {
                throw Error(`Game with ${createDto.gameId} not found in database`)
            }
            if (!await this.userRepositoy.existsById(createDto.writerId)) {
                throw Error(`Writer with ${createDto.writerId} not found in database`)
            }
        }
        if (updateDto) {
            if (!await this.gameRepository.existsById(updateDto.gameId)) {
                throw Error(`Game with ${updateDto.gameId} not found in database`)
            }
            if (!await this.userRepositoy.existsById(updateDto.writerId)) {
                throw Error(`Writer with ${updateDto.writerId} not found in database`)
            }
        }
        
    }

    private async retrieveEntitiesToBeMappedAndMapToOutputDto(reviewEntity: Review): Promise<ReviewOutputDto> {
        let game: Game = await this.gameRepository.findById(reviewEntity.gameId);
        let writer: User = await this.userRepositoy.findById(reviewEntity.writerId);
        return ReviewMapper.toOutputDto(reviewEntity, UserMapper.toOutputDtoShort(writer), GameMapper.toOutputDto(game));
    }

}