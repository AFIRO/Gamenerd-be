import { GameOutputDto } from "../entity/dto/game/game.output.dto";
import { NewsOutputDto } from "../entity/dto/news/news.output.dto";
import { UserOutputDtoShort } from "../entity/dto/user/user.output.dto.short";
import { News } from "../entity/news.model";
export class NewsMapper {
    public static toOutputDto(news: News, writer: UserOutputDtoShort, game: GameOutputDto): NewsOutputDto {
        return new NewsOutputDto({
            id: news.id,
            content: news.content,
            writer: writer,
            game: game
        });
    }
}