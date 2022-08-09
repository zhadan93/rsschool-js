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

  static switchDisabledState(
    element: HTMLInputElement | HTMLButtonElement,
    isDisabled: boolean,
    disabledElementClassName: string
  ) {
    const el = element;
    const hasDisabledElementClassName = el.classList.contains(disabledElementClassName);

    if ((isDisabled && !hasDisabledElementClassName) || (!isDisabled && hasDisabledElementClassName)) {
      Style.toggleClass(el, disabledElementClassName);
    }

    el.disabled = isDisabled;
  }
}
