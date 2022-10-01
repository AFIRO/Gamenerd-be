import { GameOutputDto } from "../game/game.output.dto";
import { UserOutputDto } from "../user/user.output.dto";

export class NewsOutputDto {
  id: string;
  content: string;
  writer: UserOutputDto;
  game: GameOutputDto;

  public constructor(base?: Partial<NewsOutputDto>) {
    this.id = base.id || this.id;
    this.writer = base.writer || this.writer;
    this.content = base.content || this.content;
    this.game = base.game || this.game;
  }
}