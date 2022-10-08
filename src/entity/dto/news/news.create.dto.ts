import {IsNotEmpty, IsString } from "class-validator";

export class NewsCreateDto {
  @IsString()
  @IsNotEmpty()
  writerId: string;
  @IsString()
  @IsNotEmpty()
  content: string;
  @IsString()
  @IsNotEmpty()
  gameId: string;

  public constructor(base?: Partial<NewsCreateDto>) {
    this.writerId = base.writerId || this.writerId;
    this.content = base.content || this.content;
    this.gameId = base.gameId || this.gameId;
  }
}