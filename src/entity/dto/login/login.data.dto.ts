import { IsNotEmpty, IsString } from "class-validator";

export class LoginDataDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  password: string;

  public constructor(base?: Partial<LoginDataDto>) {
    this.name = base.name || this.name;
    this.password = base.password || this.password;
  }
}