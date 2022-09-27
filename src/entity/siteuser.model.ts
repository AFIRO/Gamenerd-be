import { Role } from "./role";

export class SiteUser{
  id: number;
  name:string;
  role: Role;
  password:string

  constructor(base?: Partial<SiteUser>){
    this.id = base.id || this.id;
    this.name = base.name || this.name;
    this.role = base.role || this.role;
    this.password = base.password || this.password;
  }

}