export class GameOutputDto {
  id: string;
  name: string;
  boxart: string;

  public constructor(base?: Partial<GameOutputDto>) {
    this.id = base.id || this.id;
    this.name = base.name || this.name;
    this.boxart = base.boxart || this.boxart;
  }
}