import Control from '../helpers/control/htmlControl';
import Anchor from '../helpers/control/htmlAnchorControl';
import RssLogo from '../../assets/svg/sprite.svg';
import SVGControl from '../helpers/control/svgControl';
import SVGUseControl from '../helpers/control/svgUseControl';
import { FOOTER_CONTENT, FOOTER_LINKS } from '../../constants';

const { copyright, year, github, rss } = FOOTER_CONTENT;
const { githubPath, rssPath } = FOOTER_LINKS;

export default class Footer extends Control {
  constructor(parentNode: HTMLElement, tagName = 'div', className = '') {
    super(parentNode, tagName, className);

    const footerContainer = new Control(this.node, 'div', 'container footer__container');
    const authorContainer = new Control(footerContainer.node, 'div', 'author');
    new Control(authorContainer.node, 'div', 'copyright', copyright);
    new Control(authorContainer.node, 'div', 'year', year);
    new Anchor(authorContainer.node, 'a', 'github', github, githubPath, '_blank');
    const rssLink = new Anchor(footerContainer.node, 'a', 'rss__link', rss, rssPath, '_blank');
    const rssLogoSvg = new SVGControl(rssLink.node, 'svg', 'icon rss-logo__icon');
    new SVGUseControl(rssLogoSvg.node, 'use', `${RssLogo}#rss_logo`);
  }
}
