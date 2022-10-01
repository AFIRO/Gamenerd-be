export class UserOutputDto {
  id: string;
  name: string;
  role: string;
  password: string

  public constructor(base?: Partial<UserOutputDto>) {
    this.id = base.id || this.id;
    this.name = base.name || this.name;
    this.role = base.role || this.role;
    this.password = base.password || this.password;
  }

}