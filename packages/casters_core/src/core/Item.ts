export class Item {
  constructor(kind: string, name: string, description: string) {
    this._kind = kind;
    this._name = name;
    this._description = description;
  }

  get kind(): string {
    return this._kind;
  }

  get name(): string {
    if (this._name) {
      return this._name;
    } else {
      return this._kind;
    }
  }

  get description(): string {
    return this._description;
  }

  private readonly _kind: string;
  private readonly _name: string;
  private readonly _description: string;
}
