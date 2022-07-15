export default class SVGControl<TypeNode extends SVGElement = SVGElement> {
  node: TypeNode;

  constructor(parentNode: SVGElement | HTMLElement | null, tagName = 'svg', className?: string) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tagName);

    if (className) el.classList.add(className);

    if (parentNode) {
      parentNode.appendChild(el);
    }
    this.node = el as TypeNode;
  }

  destroy(): void {
    this.node.remove();
  }
}
