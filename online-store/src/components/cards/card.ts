import CardDetails from '../types/dataInterface';
import Control from '../common/control/htmlControl';
import Img from '../common/control/htmlImgControl';
import CardState from '../cardState';

export default class Card extends Control {
  constructor(parentNode: HTMLElement, tagName = 'div', className = '') {
    super(parentNode, tagName, className);
  }

  createCard(data: CardDetails): void {
    const { id, name, quantity, year, producer, color, material, favorite } = data;
    const isFavorite = favorite ? 'да' : 'нет';
    new Control(this.node, 'div', 'card__name', `${name}`);
    new Img(this.node, 'img', 'card__img', `./content/${id}.jpg`, `${name}`);
    new Control(this.node, 'div', 'card__quantity', `Осталось ${quantity} шт.`);
    new Control(this.node, 'div', 'card__year', `Год выхода: ${year}`);
    new Control(this.node, 'div', 'card__producer', `Производитель: ${producer}`);
    new Control(this.node, 'div', 'card__color', `Цвет: ${color}`);
    new Control(this.node, 'div', 'card__material', `Материал корпуса: ${material}`);
    new Control(this.node, 'div', 'card__favorite', `Популярный: ${isFavorite}`);
  }

  increaseCartProductCount(state: CardState) {
    state.data = { ...state.data, cartProductCount: ++state.data.cartProductCount };
  }

  decreaseCartProductCount(state: CardState) {
    state.data = { ...state.data, cartProductCount: --state.data.cartProductCount };
  }
}
