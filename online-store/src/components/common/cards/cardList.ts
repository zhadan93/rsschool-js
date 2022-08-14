import Control from '../../helpers/control/htmlControl';
import Card from './card';
import { CardDetails } from '../../types/dataInterface';
import AppState from '../../appState';
import { CartState } from '../../types/stateInterfaces';
import { MAX_CART_COUNT } from '../../../constants';
import Style from '../../helpers/style';
import { ALERTS } from '../../../constants';
import './cards.css';

const selectedCardClassName = 'card--active';
const { fullCartAlert, emptyFilterResultAlert } = ALERTS;
export default class CardList extends Control {
  private selectedCards: Set<string> = new Set<string>();

  constructor(parentNode: HTMLElement, tagName = 'div', className = '', private state: AppState<CartState>) {
    super(parentNode, tagName, className);
  }

  draw(data: CardDetails[]): void {
    this.node.textContent = '';

    const cardContainer = new Control(this.node, 'div', 'card-container');

    data.forEach((item) => {
      const { id } = item;
      const card = new Card(cardContainer.node, 'li', 'card');
      card.createCard(item);

      const cardEl = card.node;

      this.selectedCards = new Set(this.state.data.selectedCards);
      if (this.selectedCards.has(id)) {
        Style.toggleClass(cardEl, selectedCardClassName);
      }

      cardEl.addEventListener('click', () => {
        if (this.selectedCards.size >= MAX_CART_COUNT) {
          alert(fullCartAlert);
        } else {
          this.selectedCards.has(id) ? this.selectedCards.delete(id) : this.selectedCards.add(id);
          Style.toggleClass(cardEl, selectedCardClassName);
        }

        this.state.data = {
          ...this.state.data,
          selectedCards: [...this.selectedCards],
          cartProductCount: this.selectedCards.size,
        };
      });
    });

    if (data.length === 0) {
      cardContainer.destroy();
      this.node.textContent = emptyFilterResultAlert;
    }
  }
}
