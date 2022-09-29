import { GameOutputDto } from "../entity/dto/game/game.output.dto";
import { ReviewOutputDto } from "../entity/dto/reviewer/review.output.dto";
import { UserOutputDto } from "../entity/dto/user/user.output.dto";
import { Review } from "../entity/review.model";

export class ReviewMapper{
    public static toOutputDto(review: Review, writer: UserOutputDto, game: GameOutputDto):ReviewOutputDto {
        return new ReviewOutputDto({
            id:review.id,
            content:review.content,
            writer:writer,
            game: game});
    }
}