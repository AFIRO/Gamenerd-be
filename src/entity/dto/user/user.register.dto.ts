import { IsNotEmpty, IsString } from "class-validator";

export class UserRegisterDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    password: string

    public constructor(base?: Partial<UserRegisterDto>) {
        this.name = base.name || this.name;
        this.password = base.password || this.password;
    }
}