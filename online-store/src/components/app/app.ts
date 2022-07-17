import Control from '../helpers/control/htmlControl';
import CardDetails from '../types/dataInterface';
import CardList from '../common/cards/cardList';
import cardData from '../../data/data';
import Footer from '../common/footer';
import Header from '../common/header';
import CardState from '../cardState';
import State from '../types/stateInterface';

export default class App {
  private header: Header;
  private cards: CardList;

  constructor(private state: CardState, private data: CardDetails[] = cardData) {
    const updateCart = (data: State) => {
      this.header.cartContent = data.cartProductCount;
    };

    this.state.onChange.add(updateCart);

    const body = new Control(document.body, 'main', 'main');
    this.header = new Header(body.node, 'header', 'header');
    this.cards = new CardList(body.node, 'ul', 'cards', this.state);
    this.cards.draw(this.data);
    new Footer(body.node, 'footer', 'footer');
  }
}
