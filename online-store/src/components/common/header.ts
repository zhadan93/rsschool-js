import Control from '../helpers/control/htmlControl';
import Anchor from '../helpers/control/htmlAnchorControl';
import SVGControl from '../helpers/control/svgControl';
import SVGUseControl from '../helpers/control/svgUseControl';
import SVGSprite from '../../assets/svg/sprite.svg';
import AppState from '../appState';
import { CartState } from '../types/stateInterfaces';
import { HEADER_CONTENT } from '../../constants';
import Style from '../helpers/style';

const { logoTitle, cartContent } = HEADER_CONTENT;

export default class Header extends Control {
  private static activeCartClassName = 'shopping-cart__count--active';
  cartCount: HTMLElement;

  set cartContent(productCount: number) {
    if (productCount === 1) {
      Style.addClass(this.cartCount, Header.activeCartClassName);
    } else if (productCount === 0) {
      Style.removeClass(this.cartCount, Header.activeCartClassName);
    }

    const count = productCount || '';
    this.cartCount.innerHTML = `${count}`;
  }

  constructor(parentNode: HTMLElement, tagName = 'div', className = '', private state: AppState<CartState>) {
    super(parentNode, tagName, className);
    const headerContainer = new Control(this.node, 'div', 'container header__container');
    const logo = new Control(headerContainer.node, 'div', 'logo');
    const logoSvg = new SVGControl(logo.node, 'svg', 'icon logo__icon');
    new SVGUseControl(logoSvg.node, 'use', `${SVGSprite}#logo`);
    const title = new Control(logo.node, 'h1', 'logo__title');
    new Anchor(title.node, 'a', 'logo__link', logoTitle, '#');
    const cart = new Control(headerContainer.node, 'div', 'shopping-cart', cartContent);
    const count = this.state.data.cartProductCount || '';
    const cartCount = new Control(cart.node, 'div', 'shopping-cart__count', `${count}`);
    this.cartCount = cartCount.node;
    if (count > 0) {
      Style.addClass(this.cartCount, Header.activeCartClassName);
    }
  }
}
