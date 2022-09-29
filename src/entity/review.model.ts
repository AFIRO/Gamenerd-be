import { Game } from "./game.model";
import { SiteUser } from "./siteuser.model";

export class Review {
  id:number;
  score: number;
  contents:string;
  writerId: string;
  gameId: string;

  constructor(base?: Partial<Review>){
    this.id = base.id || this.id;
    this.score = base.score || this.score;
    this.writerId = base.writerId || this.writerId;
    this.contents = base.contents || this.contents;
    this.gameId = base.gameId || this.gameId;
  }

}