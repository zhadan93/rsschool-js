import Control from './htmlControl';

export default class Img extends Control<HTMLImageElement> {
  constructor(parentNode: HTMLElement | null, tagName = 'div', className = '', url = '', alt = '') {
    super(parentNode, tagName, className);
    this.node.src = url;
    this.node.alt = alt;
  }
}
