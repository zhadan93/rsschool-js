import Control from './control/htmlControl';
import Anchor from './control/htmlAnchorControl';
import Logo from '../../assets/svg/sprite.svg';
import SVGControl from './control/svgControl';
import SVGUseControl from './control/svgUseControl';

export default class Footer extends Control {
  constructor(parentNode: HTMLElement, tagName = 'div', className = '') {
    super(parentNode, tagName, className);
  }

  draw(): void {
    const container = new Control(this.node, 'div', 'container footer__container');
    const author = new Control(container.node, 'div', 'author');
    new Control(author.node, 'div', 'copyright', '©');
    new Control(author.node, 'div', 'year', '2022');
    new Anchor(author.node, 'a', 'github', 'github', 'https://github.com/zhadan93', '_blank');
    const link = new Anchor(container.node, 'a', 'rss__link', '', 'https://rs.school/js/', '_blank');
    const svg = new SVGControl(link.node, 'svg', 'icon');
    new SVGUseControl(svg.node, 'use', `${Logo}#rss_logo`);
  }
}
