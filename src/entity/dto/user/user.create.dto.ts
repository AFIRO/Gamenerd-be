import { IsArray, IsEnum, IsIn, IsNotEmpty, isString, IsString } from "class-validator";

export class UserCreateDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @IsArray()
    @IsIn(["ADMIN","WRITER","USER"], {each: true})
    roles: string[];
    @IsString()
    @IsNotEmpty()
    password: string

    public constructor(base?: Partial<UserCreateDto>) {
        this.name = base.name || this.name;
        this.roles = base.roles || this.roles;
        this.password = base.password || this.password;
    }
}