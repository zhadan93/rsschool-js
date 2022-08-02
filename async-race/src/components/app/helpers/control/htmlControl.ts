export default class HTMLControl<TypeNode extends HTMLElement = HTMLElement> {
  node: TypeNode;

  constructor(parentNode: HTMLElement | null, tagName = 'div', className = '', content = '') {
    const element = document.createElement(tagName);
    element.className = className;
    element.textContent = content;

    if (parentNode) {
      parentNode.appendChild(element);
    }

    this.node = element as TypeNode;
  }

  destroy(): void {
    this.node.remove();
  }
}
