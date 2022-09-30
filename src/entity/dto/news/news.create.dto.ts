import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class NewsCreateDto {
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  writerId: number;
  @IsString()
  @IsNotEmpty()
  content: string;
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  gameId: number;

  public constructor(base?: Partial<NewsCreateDto>) {
    this.writerId = base.writerId || this.writerId;
    this.content = base.content || this.content;
    this.gameId = base.gameId || this.gameId;
  }
}