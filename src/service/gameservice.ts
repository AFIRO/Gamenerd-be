import { GameCreateDto } from "../entity/dto/game/game.create.dto";
import { GameOutputDto } from "../entity/dto/game/game.output.dto";
import { GameUpdateDto } from "../entity/dto/game/game.update.dto";
import { GameMapper } from "../mapper/gamemapper";
import { GameRepository } from "../repository/gamerepository";
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
            throw ServiceError.notFound(`No games in database`, { Error: "No data" })
        }
    }

    public async findById(id: number): Promise<GameOutputDto> {
        this.logger.info(`GameService getting game with id ${id}.`)
        const potentialGame = await this.gameRepository.findById(id)
        if (potentialGame) {
            return GameMapper.toOutputDto(potentialGame);
        } else {
            this.logger.error(`Game with id ${id} not found in repository.`);
            throw ServiceError.notFound(`Game with id ${id} not found`, { id })
        }
    }

    public async create(dto: GameCreateDto): Promise<GameOutputDto> {
        this.logger.info(`GameService creating new game.`)
        return GameMapper.toOutputDto(await this.gameRepository.create(dto));
    }

    public async update(id: number, dto: GameUpdateDto): Promise<GameOutputDto> {
        this.logger.info(`GameService updating game with id ${id}.`)
        if (id != dto.id) {
            this.logger.error(`Update failed due to validation error. Id ${id} in request does not match the Id ${dto.id} in body.`)
            throw ServiceError.validationFailed(`Id ${id} in request does not match the Id ${dto.id} in body.`, { id })
        }
        return GameMapper.toOutputDto(await this.gameRepository.updateById(id, dto));
    }

    public async delete(id: number): Promise<GameOutputDto> {
        if (await this.gameRepository.existsById(id)) {
            return GameMapper.toOutputDto(await this.gameRepository.deleteById(id))
        } else {
            this.logger.error(`Game with id ${id} not found in repository.`);
            throw ServiceError.notFound(`Game with ${id} not found in database`, { id })
        }
    }
}


