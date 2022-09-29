export class UserOutputDto {
  id: number;
  name: string;
  role: string;
  password: string

  constructor(base?: Partial<UserOutputDto>) {
    this.id = base.id || this.id;
    this.name = base.name || this.name;
    this.role = base.role || this.role;
    this.password = base.password || this.password;
  }

}