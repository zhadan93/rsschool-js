import Control from '../../helpers/control/htmlControl';
import Card from './card';
import CardDetails from '../../types/dataInterface';
import CardState from '../../cardState';
import MAX_CART_COUNT from '../../../config';
import Style from '../../helpers/style';
import './cards.css';

export default class CardList extends Control {
  constructor(
    parentNode: HTMLElement,
    tagName = 'div',
    className = '',
    private state: CardState,
    private selectedCards: Set<HTMLElement> = new Set<HTMLElement>()
  ) {
    super(parentNode, tagName, className);
  }

  draw(data: CardDetails[]): void {
    data.forEach((item) => {
      const card = new Card(this.node, 'li', 'card');
      card.createCard(item);

      const cardEl = card.node;
      const selectedCardClassName = 'card--active';

      cardEl.addEventListener('click', () => {
        if (this.selectedCards.has(cardEl)) {
          this.selectedCards.delete(cardEl);
          Style.toggleClass(cardEl, selectedCardClassName);
        } else if (this.selectedCards.size >= MAX_CART_COUNT) {
          alert('Извините, все слоты заполнены');
        } else {
          this.selectedCards.add(cardEl);
          Style.toggleClass(cardEl, selectedCardClassName);
        }

        this.state.data = { ...this.state.data, cartProductCount: this.selectedCards.size };
      });
    });
  }
}
