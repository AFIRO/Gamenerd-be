import { UserOutputDto } from "./user.output.dto";

export class UserOutputDtoToken {
  user: UserOutputDto;
  token: string;

  public constructor(base?: Partial<UserOutputDtoToken>) {
    this.user = base.user || this.user;
    this.token = base.token || this.token;
  }

}