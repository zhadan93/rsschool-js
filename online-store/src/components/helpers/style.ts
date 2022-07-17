export default class Style {
  static toggleClass(el: HTMLElement, className: string): void {
    el.classList.toggle(className);
  }
}
