export default class Control<TypeNode extends HTMLElement = HTMLElement> {
  node: TypeNode;

  constructor(parentNode: HTMLElement | null, tagName = 'div', className = '', content = '') {
    const el = document.createElement(tagName);
    el.className = className;
    el.textContent = content;
    if (parentNode) {
      parentNode.appendChild(el);
    }
    this.node = el as TypeNode;
  }

  destroy(): void {
    this.node.remove();
  }
}
