class StoreInitializer {
  private _states: {
    [key: string]: Array<any>;
  };

  constructor() {
    this._states = {};
  }

  get getStates() {
    return this._states;
  }

  set setStates({ key, value }: { key: string; value: any }) {
    this._states[key].push(value);
  }
}

export const Store = new StoreInitializer();
