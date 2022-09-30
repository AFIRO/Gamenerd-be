export class NewsUpdateDto {
  id: number;
  writerId: number;
  content: string;
  gameId: number;

  public constructor(base?: Partial<NewsUpdateDto>) {
    this.id = base.id || this.id;
    this.writerId = base.writerId || this.writerId;
    this.content = base.content || this.content;
    this.gameId = base.gameId || this.gameId;
  }
}