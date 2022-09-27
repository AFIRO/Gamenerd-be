import { SiteUser } from "./siteuser.model";

export class Review {
  id:number;
  score: number;
  contents:string;
  writer: SiteUser;

  constructor(base?: Partial<Review>){
    this.id = base.id || this.id;
    this.score = base.score || this.score;
    this.writer = base.writer || this.writer;
    this.contents = base.contents || this.contents;
  }

}