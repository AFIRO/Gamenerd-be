export class NewsCreateDto {
  writerId: number;
  content: string;
  gameId: number;

  public constructor(base?: Partial<NewsCreateDto>) {
    this.writerId = base.writerId || this.writerId;
    this.content = base.content || this.content;
    this.gameId = base.gameId || this.gameId;
  }
}