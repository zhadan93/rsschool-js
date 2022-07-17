import Control from './htmlControl';

export default class Anchor extends Control<HTMLAnchorElement> {
  constructor(parentNode: HTMLElement | null, tagName = 'div', className = '', content = '', href = '', target = '') {
    super(parentNode, tagName, className, content);
    this.node.href = href;
    this.node.target = target;
  }
}
