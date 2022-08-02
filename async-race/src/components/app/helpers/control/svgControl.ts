export default class SVGControl<TypeNode extends SVGElement = SVGElement> {
  node: TypeNode;

  constructor(parentNode: SVGElement | HTMLElement | null, tagName = 'svg', classNames?: string) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', tagName);

    if (classNames) classNames.split(' ').forEach((className) => element.classList.add(className));

    if (parentNode) {
      parentNode.appendChild(element);
    }
    this.node = element as TypeNode;
  }

  destroy(): void {
    this.node.remove();
  }
}
