import HTMLControl from './htmlControl';

export default class InputControl extends HTMLControl<HTMLInputElement> {
  constructor(parentNode: HTMLElement | null, className = '', type = 'text', value = '') {
    super(parentNode, 'input', className);
    const inputValue = type === 'color' ? '#ffffff' : value;

    this.node.value = inputValue;
    this.node.type = type;
  }
}
