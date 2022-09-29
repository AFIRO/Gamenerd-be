import { GameMapper } from "../mapper/gamemapper";
import { GameRepository } from "../repository/gamerepository";
import { Logger } from "../util/logger";

export class GameService {
private logger:Logger;
private gameRepository: GameRepository
private gameMapper: GameMapper;

public constructor(){
    this.logger = new Logger();
    this.gameRepository = new GameRepository();
    this.gameMapper = new GameMapper();
}

public findAll() {
    
}
}


