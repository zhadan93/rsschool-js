import Control from '../../helpers/control/htmlControl';
import Card from './card';
import CardDetails from '../../types/dataInterface';
import AppState from '../../appState';
import { CartState } from '../../types/stateInterfaces';
import { MAX_CART_COUNT } from '../../../config';
import Style from '../../helpers/style';
import './cards.css';

export default class CardList extends Control {
  private cards: Map<string, Card> = new Map<string, Card>();
  private selectedCards: Set<string> = new Set<string>();

  constructor(parentNode: HTMLElement, tagName = 'div', className = '', private state: AppState<CartState>) {
    super(parentNode, tagName, className);
  }

  draw(data: CardDetails[]): void {
    if (this.cards.size) {
      this.cards.forEach((card) => card.destroy());
      this.cards.clear();
    }

    if (data.length) {
      data.forEach((item) => {
        const { id } = item;
        const card = new Card(this.node, 'li', 'card');
        card.createCard(item);
        this.cards.set(id, card);

        const cardEl = card.node;
        const selectedCardClassName = 'card--active';

        this.selectedCards = new Set(this.state.data.selectedCards);
        if (this.selectedCards.has(id)) {
          Style.toggleClass(cardEl, selectedCardClassName);
        }

        cardEl.addEventListener('click', () => {
          this.selectedCards = new Set(this.state.data.selectedCards);

          if (this.selectedCards.has(id)) {
            this.selectedCards.delete(id);
            Style.toggleClass(cardEl, selectedCardClassName);
          } else if (this.selectedCards.size >= MAX_CART_COUNT) {
            alert('Извините, все слоты заполнены');
          } else {
            this.selectedCards.add(id);
            Style.toggleClass(cardEl, selectedCardClassName);
          }

          this.state.data = {
            ...this.state.data,
            selectedCards: [...this.selectedCards],
            cartProductCount: this.selectedCards.size,
          };
        });
      });
    } else {
      const empty = new Card(this.node, 'div', 'empty');
      empty.node.innerText = 'Извините, совпадений не найдено';
      this.cards.set('1', empty);
    }
  }

  resetCardState() {
    this.selectedCards.forEach((card) => {
      if (this.selectedCards.has(card)) {
        const cardEl = this.cards.get(card);
        if (cardEl) {
          Style.toggleClass(cardEl.node, 'card--active');
        }
      }
    });
  }
}
