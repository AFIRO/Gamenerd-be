import { IsArray, IsIn, IsNotEmpty, IsString } from "class-validator";

export class UserUpdateDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsArray()
  @IsNotEmpty()
  @IsIn(["ADMIN","WRITER","USER"], {each: true})
  roles: string[];
  @IsString()
  @IsNotEmpty()
  password: string

  public constructor(base?: Partial<UserUpdateDto>) {
    this.id = base.id || this.id;
    this.name = base.name || this.name;
    this.roles = base.roles || this.roles;
    this.password = base.password || this.password;
  }
}