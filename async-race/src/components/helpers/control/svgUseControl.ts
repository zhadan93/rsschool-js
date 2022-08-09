import SVGControl from './svgControl';

export default class SVGUseControl extends SVGControl {
  constructor(href: string, parentNode: SVGElement | null) {
    super(parentNode, 'use');
    this.node.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', href);
  }
}
