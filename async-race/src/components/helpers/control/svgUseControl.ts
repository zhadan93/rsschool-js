import SVGControl from './svgControl';

export default class SVGUseControl extends SVGControl {
  constructor(parentNode: SVGElement | null, tagName = 'use', href: string) {
    super(parentNode, tagName);
    this.node.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', href);
  }
}
