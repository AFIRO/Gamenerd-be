import { IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";

export class ReviewUpdateDto {
  @IsString()
  @IsNotEmpty()
  id: string;
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

  public constructor(base?: Partial<ReviewUpdateDto>) {
    this.id = base.id || this.id;
    this.score = base.score || this.score;
    this.writerId = base.writerId || this.writerId;
    this.content = base.content || this.content;
    this.gameId = base.gameId || this.gameId;
  }
}