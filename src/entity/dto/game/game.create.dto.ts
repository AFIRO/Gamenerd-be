import {IsNotEmpty, IsString} from 'class-validator';

export class GameCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  boxart: string;

  public constructor(base?: Partial<GameCreateDto>) {
    this.name = base.name || this.name;
    this.boxart = base.boxart || this.boxart;
  }
}