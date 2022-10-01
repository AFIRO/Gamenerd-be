import { GameCreateDto } from "../entity/dto/game/game.create.dto";
import { GameOutputDto } from "../entity/dto/game/game.output.dto";
import { GameUpdateDto } from "../entity/dto/game/game.update.dto";
import { GameMapper } from "../mapper/game.mapper";
import { GameRepository } from "../repository/game.repository";
import { Logger } from "../util/logger";
import { ServiceError } from "../util/serviceError";

export class GameService {
    private logger: Logger;
    private gameRepository: GameRepository

    public constructor() {
        this.logger = new Logger();
        this.gameRepository = new GameRepository();
    }

    public async findAll(): Promise<GameOutputDto[]> {
        this.logger.info(`GameService getting all games.`)
        const data = await this.gameRepository.findAll();
        if (data.length != 0) {
            return data.map(GameMapper.toOutputDto);
        }
        else {
            this.logger.error(`No games in database`)
            throw Error(`No games in database`)
        }
    }

    public async findById(id: string): Promise<GameOutputDto> {
        this.logger.info(`GameService getting game with id ${id}.`)
        const potentialGame = await this.gameRepository.findById(id)
        if (potentialGame) {
            return GameMapper.toOutputDto(potentialGame);
        } else {
            this.logger.error(`Game with id ${id} not found in repository.`);
            throw Error(`Game with id ${id} not found`)
        }
    }

    public async create(dto: GameCreateDto): Promise<GameOutputDto> {
        this.logger.info(`GameService creating new game.`)
        return GameMapper.toOutputDto(await this.gameRepository.create(dto));
    }

    public async update(id: string, dto: GameUpdateDto): Promise<GameOutputDto> {
        this.logger.info(`GameService updating game with id ${id}.`)
        if (id != dto.id) {
            this.logger.error(`Update failed due to validation error. Id ${id} in request does not match the Id ${dto.id} in body.`)
            throw Error(`Id ${id} in request does not match the Id ${dto.id} in body.`)
        }
        return GameMapper.toOutputDto(await this.gameRepository.updateById(id, dto));
    }

    public async delete(id: string): Promise<GameOutputDto> {
        if (await this.gameRepository.existsById(id)) {
            return GameMapper.toOutputDto(await this.gameRepository.deleteById(id))
        } else {
            this.logger.error(`Game with id ${id} not found in repository.`);
            throw Error(`Game with id ${id} not found in database`)
        }
    }
}


