export class GameUpdateDto {
  id:number;
  name:string;
  boxart:string;
  reviewId:number;
  newsIds: number[];

  constructor(base?: Partial<GameUpdateDto>){
    this.id = base.id || this.id;
    this.name = base.name || this.name;
    this.boxart = base.boxart || this.boxart;
    this.reviewId = base.reviewId || this.reviewId;
    this.newsIds = base.newsIds || [];
  }
}