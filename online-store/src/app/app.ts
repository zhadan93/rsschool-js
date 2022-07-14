import Control from '../common/control';
import CardDetails from '../types/dataInterface';
import CardList from '../cards/cardList';
import cardData from '../data/data';

export default class App {
  constructor(private data: CardDetails[] = cardData) {}
  start() {
    const main = new Control(document.body, 'main', 'main');
    const cards = new CardList(main.node, 'ul', 'cards');
    cards.draw(this.data);
  }
}
