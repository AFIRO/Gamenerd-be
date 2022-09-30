import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class ReviewUpdateDto {
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  id: number;
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

  
  public constructor(base?: Partial<ReviewUpdateDto>) {
    this.id = base.id || this.id;
    this.score = base.score || this.score;
    this.writerId = base.writerId || this.writerId;
    this.content = base.content || this.content;
    this.gameId = base.gameId || this.gameId;
  }
}