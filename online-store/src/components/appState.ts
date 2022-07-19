import Signal from './helpers/signal';

export default class AppState<Type> {
  private _data: Type;

  get data() {
    return this._data;
  }

  set data(updatedData: Type) {
    this._data = updatedData;
    this.onChange.emit(this._data);
  }

  constructor(initialData: Type) {
    this._data = initialData;
  }

  onChange = new Signal<Type>();
}
