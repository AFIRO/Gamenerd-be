export class UserOutputDto {
  id: string;
  name: string;
  roles: string[];

  public constructor(base?: Partial<UserOutputDto>) {
    this.id = base.id || this.id;
    this.name = base.name || this.name;
    this.roles = base.roles || this.roles;
  }

}