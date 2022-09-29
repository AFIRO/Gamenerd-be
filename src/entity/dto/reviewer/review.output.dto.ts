import { GameOutputDto } from "../game/game.output.dto";
import { UserOutputDto } from "../user/user.output.dto";

export class ReviewOutputDto {
  id: number;
  score: number;
  content: string;
  writer: UserOutputDto;
  game: GameOutputDto;

  constructor(base?: Partial<ReviewOutputDto>) {
    this.id = base.id || this.id;
    this.score = base.score || this.score;
    this.writer = base.writer || this.writer;
    this.content = base.content || this.content;
    this.game = base.game || this.game;
  }

}