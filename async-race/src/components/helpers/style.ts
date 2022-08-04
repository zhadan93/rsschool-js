export default class Style {
  static toggleClass(el: HTMLElement, className: string): void {
    el.classList.toggle(className);
  }

  static addClass(el: HTMLElement, className: string): void {
    el.classList.add(className);
  }

  static removeClass(el: HTMLElement, className: string): void {
    el.classList.remove(className);
  }
}
