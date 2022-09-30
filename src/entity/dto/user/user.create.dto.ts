import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class UserCreateDto {
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

    public constructor(base?: Partial<UserCreateDto>) {
        this.name = base.name || this.name;
        this.role = base.role || this.role;
        this.password = base.password || this.password;
    }
}