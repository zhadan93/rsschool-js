import Control from '../helpers/control/htmlControl';
import Anchor from '../helpers/control/htmlAnchorControl';
import RssLogo from '../../assets/svg/sprite.svg';
import SVGControl from '../helpers/control/svgControl';
import SVGUseControl from '../helpers/control/svgUseControl';

export default class Footer extends Control {
  constructor(parentNode: HTMLElement, tagName = 'div', className = '') {
    super(parentNode, tagName, className);

    const footerContainer = new Control(this.node, 'div', 'container footer__container');
    const authorContainer = new Control(footerContainer.node, 'div', 'author');
    new Control(authorContainer.node, 'div', 'copyright', '©');
    new Control(authorContainer.node, 'div', 'year', '2022');
    new Anchor(authorContainer.node, 'a', 'github', 'github', 'https://github.com/zhadan93', '_blank');
    const rssLink = new Anchor(footerContainer.node, 'a', 'rss__link', '', 'https://rs.school/js/', '_blank');
    const rssLogoSvg = new SVGControl(rssLink.node, 'svg', 'icon rss-logo__icon');
    new SVGUseControl(rssLogoSvg.node, 'use', `${RssLogo}#rss_logo`);
  }
}
