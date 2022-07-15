import Control from '../common/control/htmlControl';
import CardDetails from '../types/dataInterface';
import CardList from '../cards/cardList';
import cardData from '../../data/data';
import Footer from '../common/footer';

export default class App {
  constructor(private data: CardDetails[] = cardData) {}
  start() {
    const main = new Control(document.body, 'main', 'main');
    const cards = new CardList(main.node, 'ul', 'cards');
    cards.draw(this.data);
    const footer = new Footer(main.node, 'footer', 'footer');
    footer.draw();
  }
}
