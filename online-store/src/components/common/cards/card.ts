import { CardDetails } from '../../types/dataInterface';
import Control from '../../helpers/control/htmlControl';
import Img from '../../helpers/control/htmlImgControl';
import { CARD_CONTENT } from '../../../constants';

export default class Card extends Control {
  constructor(parentNode: HTMLElement, tagName = 'div', className = '') {
    super(parentNode, tagName, className);
  }

  createCard(data: CardDetails): void {
    const { id, name, favorite, ...args } = data;
    new Control(this.node, 'h3', 'card__name', `${name}`);
    new Img(this.node, 'img', 'card__img', `./content/${id}.jpg`, `${name}`);
    const productCharacteristics = new Control(this.node, 'div', 'card__characteristics');

    CARD_CONTENT.forEach(({ field, content }) => {
      let fieldValue = args[field as keyof typeof args];

      if (field === 'favorite') fieldValue = favorite ? 'да' : 'нет';

      let fieldContent = `${content} ${fieldValue}`;

      if (field === 'quantity') {
        const [contentPrev, contentNext] = content.split(' ');
        fieldContent = `${contentPrev} ${fieldValue} ${contentNext}`;
      }

      new Control(productCharacteristics.node, 'div', `card__${field}`, `${fieldContent}`);
    });
  }
}
