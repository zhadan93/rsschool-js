import Signal from './helpers/signal';

export default class AppState<Type> {
  private currentData: Type;

  get data() {
    return this.currentData;
  }

  set data(updatedData: Type) {
    this.currentData = updatedData;
    this.onChange.emit(this.currentData);
  }

  constructor(initialData: Type) {
    this.currentData = initialData;
  }

  onChange = new Signal<Type>();
}
