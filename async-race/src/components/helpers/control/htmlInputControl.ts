import HTMLControl from './htmlControl';
import { DEFAULT_COLOR } from '../../../constants';

export default class InputControl extends HTMLControl<HTMLInputElement> {
  constructor(parentNode: HTMLElement | null, className = '', type = 'text', value = '') {
    super(parentNode, 'input', className);
    const inputValue = type === 'color' ? DEFAULT_COLOR : value;

    this.node.value = inputValue;
    this.node.type = type;
  }
}
