import {IsInt, IsNotEmpty, IsPositive, IsString} from 'class-validator';
export class GameUpdateDto {
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  id: number;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  boxart: string;

  public constructor(base?: Partial<GameUpdateDto>) {
    this.id = base.id || this.id;
    this.name = base.name || this.name;
    this.boxart = base.boxart || this.boxart;
  }
}