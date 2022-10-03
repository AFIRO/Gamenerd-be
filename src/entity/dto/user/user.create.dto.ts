import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class UserCreateDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
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