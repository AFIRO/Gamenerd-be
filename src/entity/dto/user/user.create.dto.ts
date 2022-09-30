export class UserCreateDto {
    name: string;
    role: string;
    password: string

    public constructor(base?: Partial<UserCreateDto>) {
        this.name = base.name || this.name;
        this.role = base.role || this.role;
        this.password = base.password || this.password;
    }
}