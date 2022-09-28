import { Game } from "@prisma/client";
import { SiteUser } from "./siteuser.model";

export class News {
  id:number;
  writer: SiteUser;
  contents: string;
  game: Game;

  constructor(base?: Partial<News>){
    this.id = base.id || this.id;
    this.writer = base.writer || this.writer;
    this.contents = base.contents || this.contents;
    this.game = base.game || this.game;
  }
}