import { GridSquare } from './core-square';


class LocalStorage {
  constructor(key: string) {
    this._key = key;
  }
  readonly _key: string;

  get() : any {
    const rawStorage = localStorage.getItem(this._key);
    return rawStorage ? JSON.parse(rawStorage) : null;
  }

  set(data: any) {
    if(data === null || data === undefined) {
      localStorage.removeItem(this._key);
    } else {
      const stringified = JSON.stringify(data);
      localStorage.setItem(this._key, stringified)
    }
  }

  static make(squares: Array<GridSquare>) {
    const key = squares.map(sq => sq.clue).join();
    return new LocalStorage(key);
  }

  static clearAll() {
    localStorage.clear();
  }
}


export default LocalStorage;