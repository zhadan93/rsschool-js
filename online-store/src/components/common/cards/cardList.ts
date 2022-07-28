import Control from '../../helpers/control/htmlControl';
import Card from './card';
import CardDetails from '../../types/dataInterface';
import AppState from '../../appState';
import { CartState } from '../../types/stateInterfaces';
import { MAX_CART_COUNT } from '../../../constants';
import Style from '../../helpers/style';
import { ALERTS } from '../../../constants';
import './cards.css';

const selectedCardClassName = 'card--active';
const { fullCartAlert, emptyFilterResultAlert } = ALERTS;
export default class CardList extends Control {
  private cards: Map<string, Card> = new Map<string, Card>();
  private selectedCards: Set<string> = new Set<string>();

  constructor(parentNode: HTMLElement, tagName = 'div', className = '', private state: AppState<CartState>) {
    super(parentNode, tagName, className);
  }

  draw(data: CardDetails[]): void {
    this.cards.forEach((card) => card.destroy());
    this.node.textContent = '';
    Style.removeClass(this.node, 'cards--empty');

    data.forEach((item) => {
      const { id } = item;
      const card = new Card(this.node, 'li', 'card');
      card.createCard(item);
      this.cards.set(id, card);

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
      this.node.textContent = emptyFilterResultAlert;
      Style.addClass(this.node, 'cards--empty');
    }
  }
}
