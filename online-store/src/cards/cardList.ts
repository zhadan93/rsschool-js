import Control from '../common/control';
import Card from './card';
import CardDetails from '../types/dataInterface';
import './cards.css';

export default class CardList extends Control {
  constructor(parentNode: HTMLElement, tagName = 'div', className = '') {
    super(parentNode, tagName, className);
  }

  draw(data: CardDetails[]) {
    data.forEach((item) => {
      const card = new Card(this.node, 'li', 'card');
      card.createCard(item);
    });
  }
}
