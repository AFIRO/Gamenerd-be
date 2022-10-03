import { IsInt, IsNotEmpty, IsPositive, IsString, Max, Min } from "class-validator";

export class ReviewCreateDto {
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(10)
  score: number;
  @IsString()
  @IsNotEmpty()
  content: string;
  @IsString()
  @IsNotEmpty()
  writerId: string;
  @IsString()
  @IsNotEmpty()
  gameId: string;

  public constructor(base?: Partial<ReviewCreateDto>) {
    this.score = base.score || this.score;
    this.content = base.content || this.content;
    this.writerId = base.writerId || this.writerId;
    this.gameId = base.gameId || this.gameId;
  }
}