import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class NewsUpdateDto {
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  id: number;
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

  public constructor(base?: Partial<NewsUpdateDto>) {
    this.id = base.id || this.id;
    this.writerId = base.writerId || this.writerId;
    this.content = base.content || this.content;
    this.gameId = base.gameId || this.gameId;
  }
}