import State from './types/stateInterface';
import Signal from './common/signal';

export default class CardState {
  private _data: State;

  get data() {
    return this._data;
  }

  set data(updatedData: State) {
    this._data = updatedData;
    this.onChange.emit(this._data);
  }

  constructor(initialData: State) {
    this._data = initialData;
  }

  onChange = new Signal<State>();
}
