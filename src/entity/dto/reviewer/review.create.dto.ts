import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class ReviewCreateDto {
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  score: number;
  @IsString()
  @IsNotEmpty()
  content: string;
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  writerId: number;
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  gameId: number;

  public constructor(base?: Partial<ReviewCreateDto>) {
    this.score = base.score || this.score;
    this.content = base.content || this.content;
    this.writerId = base.writerId || this.writerId;
    this.gameId = base.gameId || this.gameId;
  }
}