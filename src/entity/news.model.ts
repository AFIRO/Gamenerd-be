import { Game } from "@prisma/client";
import { SiteUser } from "./siteuser.model";

export class News {
  id:number;
  contents: string;
  writerId: string;
  gameId: string;

  constructor(base?: Partial<News>){
    this.id = base.id || this.id;
    this.writerId = base.writerId || this.writerId;
    this.contents = base.contents || this.contents;
    this.gameId = base.gameId || this.gameId;
  }
}