export class ReviewUpdateDto {
  id: number;
  score: number;
  content: string;
  writerId: number;
  gameId: number;

  
  public constructor(base?: Partial<ReviewUpdateDto>) {
    this.id = base.id || this.id;
    this.score = base.score || this.score;
    this.writerId = base.writerId || this.writerId;
    this.content = base.content || this.content;
    this.gameId = base.gameId || this.gameId;
  }
}