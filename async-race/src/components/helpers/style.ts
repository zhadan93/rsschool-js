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
    const currentElement = element;
    const hasElementDisabledClassName = currentElement.classList.contains(disabledElementClassName);

    if ((isDisabled && !hasElementDisabledClassName) || (!isDisabled && hasElementDisabledClassName)) {
      Style.toggleClass(currentElement, disabledElementClassName);
    }

    currentElement.disabled = isDisabled;
  }
}
