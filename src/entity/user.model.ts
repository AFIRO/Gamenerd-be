export class User {
  id: string;
  name: string;
  roles: string[];
  password: string

  public constructor(base?: Partial<User>) {
    this.id = base.id || this.id;
    this.name = base.name || this.name;
    this.roles = base.roles || this.roles;
    this.password = base.password || this.password;
  }
}