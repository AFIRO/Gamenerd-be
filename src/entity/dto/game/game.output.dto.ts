export class GameOutputDto {
    id:number;
    name:string;
    boxart:string;
  
    constructor(base?: Partial<GameOutputDto>){
      this.id = base.id || this.id;
      this.name = base.name || this.name;
      this.boxart = base.boxart || this.boxart;
    }
  }