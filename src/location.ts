export class Location {
  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
    this._exits = new Map<string, Location>();
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get exits(): Map<string, Location> {
    return this._exits;
  }

  getExit(name: string): Location {
    let exit = this._exits.get(name);
    if (!exit) {
      throw new Error(`Exit '${name}' does not exist.`);
    }
    return exit;
  }

  addExit(direction: string, location: Location): void {
    this._exits.set(direction, location);
  }

  private readonly _name: string;
  private readonly _description: string;
  private readonly _exits: Map<string, Location>;
}
