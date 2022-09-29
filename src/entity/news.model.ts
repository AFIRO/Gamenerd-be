export class News {
  id: number;
  content: string;
  writerId: number;
  gameId: number;

  constructor(base?: Partial<News>) {
    this.id = base.id || this.id;
    this.writerId = base.writerId || this.writerId;
    this.content = base.content || this.content;
    this.gameId = base.gameId || this.gameId;
  }
}