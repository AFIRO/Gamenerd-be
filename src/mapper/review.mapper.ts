import { GameOutputDto } from "../entity/dto/game/game.output.dto";
import { ReviewOutputDto } from "../entity/dto/review/review.output.dto";
import { UserOutputDtoShort } from "../entity/dto/user/user.output.dto.short";
import { Review } from "../entity/review.model";

export class ReviewMapper {
    public static toOutputDto(review: Review, writer: UserOutputDtoShort, game: GameOutputDto): ReviewOutputDto {
        return new ReviewOutputDto({
            id: review.id,
            content: review.content,
            writer: writer,
            game: game
        });
    }
}