import HTMLControl from './htmlControl';

export default class InputControl extends HTMLControl<HTMLInputElement> {
  constructor(parentNode: HTMLElement | null, className = '', type = 'text', value = '') {
    super(parentNode, 'input', className);

    this.node.value = value;
    this.node.type = type;
  }
}
