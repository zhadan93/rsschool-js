import Control from './control/htmlControl';
import Anchor from './control/htmlAnchorControl';
import SVGControl from './control/svgControl';
import SVGUseControl from './control/svgUseControl';
import SVGSprite from '../../assets/svg/sprite.svg';

export default class Header extends Control {
  cartCount: HTMLElement;

  set cartContent(productCount: number) {
    let count = productCount || '';

    if (productCount === 1 || productCount === 0) {
      this.cartCount.classList.toggle('shopping-cart__count--active');
    } else if (productCount === 21) {
      alert('Извините, все слоты заполнены');
      count = 20;
    }

    this.cartCount.innerHTML = `${count}`;
  }

  constructor(parentNode: HTMLElement, tagName = 'div', className = '') {
    super(parentNode, tagName, className);

    const headerContainer = new Control(this.node, 'div', 'container header__container');
    const logo = new Control(headerContainer.node, 'div', 'logo');
    const logoSvg = new SVGControl(logo.node, 'svg', 'icon logo__icon');
    new SVGUseControl(logoSvg.node, 'use', `${SVGSprite}#logo`);
    const title = new Control(logo.node, 'h1', 'logo__title');
    new Anchor(title.node, 'a', 'logo__link', 'Online Store', '#');
    const cart = new Control(headerContainer.node, 'div', 'shopping-cart', 'Корзина');
    const cartCount = new Control(cart.node, 'div', 'shopping-cart__count');
    this.cartCount = cartCount.node;
  }
}
