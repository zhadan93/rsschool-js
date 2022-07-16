export default class Signal<ListenerType> {
  constructor(private listeners: Array<(params: ListenerType) => void> = []) {}

  add(listener: (params: ListenerType) => void): void {
    this.listeners.push(listener);
  }

  remove(listener: (params: ListenerType) => void): void {
    this.listeners = this.listeners.filter((item) => item !== listener);
  }

  emit(params: ListenerType): void {
    this.listeners.forEach((listener) => listener(params));
  }
}
