import { IsIn, IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class UserUpdateDto {
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  id: number;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  @IsIn(["ADMIN","WRITER","USER"])
  role: string;
  @IsString()
  @IsNotEmpty()
  password: string

  public constructor(base?: Partial<UserUpdateDto>) {
    this.id = base.id || this.id;
    this.name = base.name || this.name;
    this.role = base.role || this.role;
    this.password = base.password || this.password;
  }
}