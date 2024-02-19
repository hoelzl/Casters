import { Item } from "./Item";

export class Location {
  constructor(
    name: string,
    description: string,
    items: Item[] = [],
    imageName: string = "default",
  ) {
    this._name = name;
    this._description = description;
    this._exits = new Map<string, Location>();
    this._items = items;
    this._imageName = imageName;
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

  get items(): Item[] {
    return this._items;
  }

  get imageName(): string {
    return this._imageName;
  }

  getExit(name: string): Location {
    let exit = this._exits.get(name);
    if (!exit) {
      throw new Error(`Exit '${name}' does not exist.`);
    }
    return exit;
  }

  // noinspection JSUnusedGlobalSymbols
  addExit(direction: string, location: Location): void {
    this._exits.set(direction, location);
  }

  addItem(item: Item): void {
    this._items.push(item);
  }

  dropItem(item: Item): void {
    this._items = this._items.filter((i) => i !== item);
  }

  private readonly _name: string;
  private readonly _description: string;
  private readonly _exits: Map<string, Location>;
  private _items: Item[];
  private readonly _imageName: string;
}
