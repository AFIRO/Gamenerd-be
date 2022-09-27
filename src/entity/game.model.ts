import { News } from "./news.model";
import { Review } from "./review.model";

export class Game {
  id:number;
  name:string;
  boxart:string;
  review:Review;
  news: News[];

  constructor(base?: Partial<Game>){
    this.id = base.id || this.id;
    this.name = base.name || this.name;
    this.boxart = base.boxart || this.boxart;
    this.review = base.review || this.review;
    this.news = base.news || [];
  }
}