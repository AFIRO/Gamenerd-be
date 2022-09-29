export class Game {
  id:number;
  name:string;
  boxart:string;

  constructor(base?: Partial<Game>){
    this.id = base.id || this.id;
    this.name = base.name || this.name;
    this.boxart = base.boxart || this.boxart;
  }
}