import { NewsCreateDto } from "../entity/dto/news/news.create.dto";
import { NewsOutputDto } from "../entity/dto/news/news.output.dto";
import { NewsUpdateDto } from "../entity/dto/news/news.update.dto";
import { Game } from "../entity/game.model";
import { News } from "../entity/news.model";
import { User } from "../entity/user.model";
import { GameMapper } from "../mapper/game.mapper";
import { NewsMapper } from "../mapper/news.mapper";
import { UserMapper } from "../mapper/user.mapper";
import { GameRepository } from "../repository/game.repository";
import { NewsRepository } from "../repository/news.repository";
import { UserRepository } from "../repository/user.repository";
import { Logger } from "../util/logger";
import { ServiceError } from "../util/serviceError";

export class NewsService {
    private logger: Logger;
    private gameRepository: GameRepository;
    private userRepositoy: UserRepository;
    private newsRepository: NewsRepository;

    public constructor() {
        this.logger = new Logger();
        this.gameRepository = new GameRepository();
        this.newsRepository = new NewsRepository();
        this.userRepositoy = new UserRepository()
    }

    public async findAll(): Promise<NewsOutputDto[]> {
        this.logger.info(`NewsService getting all news.`)
        const data: News[] = await this.newsRepository.findAll();
        if (data.length != 0) {
            const mappedData: NewsOutputDto[] = []
            for (let news of data) {
                let mappedNews: NewsOutputDto = await this.retrieveEntitiesToBeMappedAndMapToOutputDto(news);
                mappedData.push(mappedNews);
            }
            return mappedData
        } else {
            this.logger.error(`No news in database`)
            throw ServiceError.notFound(`No news in database`, { Error: "No data" })
        }
    }

    public async findById(id: number): Promise<NewsOutputDto> {
        this.logger.info(`NewsService getting game with id ${id}.`)
        const newsEntity: News = await this.newsRepository.findById(id);
        if (newsEntity) {
            return await this.retrieveEntitiesToBeMappedAndMapToOutputDto(newsEntity);
        } else {
            this.logger.error(`News with id ${id} not found in repository.`);
            throw ServiceError.notFound(`News with ${id} not found in database`, { id })
        }
    }

    public async create(dto: NewsCreateDto): Promise<NewsOutputDto> {
        this.logger.info(`NewsService creating new news.`)
        const newsEntity: News = await this.newsRepository.create(dto);
        return await this.retrieveEntitiesToBeMappedAndMapToOutputDto(newsEntity)
    }

    public async update(id: number, dto: NewsUpdateDto): Promise<NewsOutputDto> {
        this.logger.info(`NewsService updating news with id ${id}.`)
        if (id != dto.id) {
            this.logger.error(`Update failed due to validation error. Id ${id} in request does not match the Id ${dto.id} in body.`)
            throw ServiceError.validationFailed(`Id ${id} in request does not match the Id ${dto.id} in body.`, { id })
        }
        const newsEntity: News = await this.newsRepository.updateById(id, dto);
        return await this.retrieveEntitiesToBeMappedAndMapToOutputDto(newsEntity)
    }

    public async delete(id: number): Promise<NewsOutputDto> {
        this.logger.info(`NewsService deleting user with id ${id}.`)
        if (await this.newsRepository.existsById(id)) {
            const newsEntity: News = await this.newsRepository.deleteById(id);
            return await this.retrieveEntitiesToBeMappedAndMapToOutputDto(newsEntity)
        } else {
            this.logger.error(`News with id ${id} not found in repository.`);
            throw ServiceError.notFound(`News with ${id} not found in database`, { id })
        }
    }

    private async retrieveEntitiesToBeMappedAndMapToOutputDto(newsEntity: News): Promise<NewsOutputDto> {
        let mappedNews: NewsOutputDto;
        if (!await this.gameRepository.existsById(newsEntity.gameId)) {
            throw ServiceError.notFound(`Game with ${newsEntity.gameId} not found in database`, { id: newsEntity.gameId })
        }
        if (!await this.userRepositoy.existsById(newsEntity.writerId)) {
            throw ServiceError.notFound(`Writer with ${newsEntity.writerId} not found in database`, { id: newsEntity.writerId })
        }
        let game: Game = await this.gameRepository.findById(newsEntity.gameId);
        let writer: User = await this.userRepositoy.findById(newsEntity.writerId);
        mappedNews = NewsMapper.toOutputDto(newsEntity, UserMapper.toOutputDto(writer), GameMapper.toOutputDto(game));
        return mappedNews;
    }

}