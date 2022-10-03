export class UserOutputDtoShort {
  id: string;
  name: string;

  public constructor(base?: Partial<UserOutputDtoShort>) {
    this.id = base.id || this.id;
    this.name = base.name || this.name;
  }

}