import { IsNotEmpty, IsString } from "class-validator";

export class UserPasswordUpdateDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  password: string

  public constructor(base?: Partial<UserPasswordUpdateDto>) {
    this.id = base.id || this.id;
    this.password = base.password || this.password;
  }
}