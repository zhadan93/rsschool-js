import Control from '../helpers/control/htmlControl';
import Anchor from '../helpers/control/htmlAnchorControl';
import SVGControl from '../helpers/control/svgControl';
import SVGUseControl from '../helpers/control/svgUseControl';
import SVGSprite from '../../assets/svg/sprite.svg';
import AppState from '../appState';
import { CartState } from '../types/stateInterfaces';
import Style from '../helpers/style';

export default class Header extends Control {
  cartCount: HTMLElement;

  set cartContent(productCount: number) {
    const count = productCount || '';

    if (productCount === 1 || productCount === 0) {
      Style.toggleClass(this.cartCount, 'shopping-cart__count--active');
    }

    this.cartCount.innerHTML = `${count}`;
  }

  constructor(parentNode: HTMLElement, tagName = 'div', className = '', private state: AppState<CartState>) {
    super(parentNode, tagName, className);

    const headerContainer = new Control(this.node, 'div', 'container header__container');
    const logo = new Control(headerContainer.node, 'div', 'logo');
    const logoSvg = new SVGControl(logo.node, 'svg', 'icon logo__icon');
    new SVGUseControl(logoSvg.node, 'use', `${SVGSprite}#logo`);
    const title = new Control(logo.node, 'h1', 'logo__title');
    new Anchor(title.node, 'a', 'logo__link', 'Online Store', '#');
    const cart = new Control(headerContainer.node, 'div', 'shopping-cart', 'Корзина');
    const count = `${this.state.data.cartProductCount}` || '';
    const cartCount = new Control(cart.node, 'div', 'shopping-cart__count', count);
    this.cartCount = cartCount.node;
  }
}
