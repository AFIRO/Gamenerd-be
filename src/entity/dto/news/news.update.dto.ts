import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class NewsUpdateDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  writerId: string;
  @IsString()
  @IsNotEmpty()
  content: string;
  @IsString()
  @IsNotEmpty()
  gameId: string;

  public constructor(base?: Partial<NewsUpdateDto>) {
    this.id = base.id || this.id;
    this.writerId = base.writerId || this.writerId;
    this.content = base.content || this.content;
    this.gameId = base.gameId || this.gameId;
  }
}