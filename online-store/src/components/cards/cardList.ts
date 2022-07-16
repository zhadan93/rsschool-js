import Control from '../common/control/htmlControl';
import Card from './card';
import CardDetails from '../types/dataInterface';
import CardState from '../cardState';
import './cards.css';

export default class CardList extends Control {
  constructor(
    parentNode: HTMLElement,
    tagName = 'div',
    className = '',
    private state: CardState,
    private cards: Set<HTMLElement> = new Set<HTMLElement>()
  ) {
    super(parentNode, tagName, className);
  }

  draw(data: CardDetails[]): void {
    data.forEach((item) => {
      const card = new Card(this.node, 'li', 'card');
      card.createCard(item);

      const cardEl = card.node;
      cardEl.addEventListener('click', () => {
        if (this.state.data.cartProductCount === 21) {
          card.decreaseCartProductCount(this.state);
        }

        if (this.cards.has(cardEl)) {
          this.cards.delete(cardEl);
          card.decreaseCartProductCount(this.state);
          cardEl.classList.toggle('card--active');
        } else {
          if (this.state.data.cartProductCount < 20) {
            this.cards.add(cardEl);
            cardEl.classList.toggle('card--active');
          }
          card.increaseCartProductCount(this.state);
        }
      });
    });
  }
}
