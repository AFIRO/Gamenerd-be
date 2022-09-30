import { GameOutputDto } from "../entity/dto/game/game.output.dto";
import { Game } from "../entity/game.model";

export class GameMapper {
    public static toOutputDto(game: Game): GameOutputDto {
        return new GameOutputDto(game);
    }

}