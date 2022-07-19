import Control from '../helpers/control/htmlControl';
import CardDetails from '../types/dataInterface';
import CardList from '../common/cards/cardList';
import cardData from '../../data/data';
import Footer from '../common/footer';
import Header from '../common/header';
import AppState from '../appState';
import { CartState, CardState } from '../types/stateInterfaces';
import FilterList from '../common/filtration/filterList';

export default class App {
  private header: Header;
  private cardContainer: CardList;
  private filterContainer: FilterList;
  private cartState: AppState<CartState>;
  private cardState: AppState<CardState>;

  constructor(private data: CardDetails[] = cardData) {
    const initialCartState: CartState = {
      cartProductCount: 0,
    };
    this.cartState = new AppState<CartState>(initialCartState);
    const updateCart = (data: CartState) => {
      this.header.cartContent = data.cartProductCount;
    };
    this.cartState.onChange.add(updateCart);

    const initialCardState: CardState = {
      colors: [],
      producers: [],
      materials: [],
      favorites: [],
      resultCardData: [],
    };
    this.cardState = new AppState<CardState>(initialCardState);
    const updateCards = (data: CardState) => {
      this.cardContainer.draw(data.resultCardData);
    };
    this.cardState.onChange.add(updateCards);

    this.header = new Header(document.body, 'header', 'header');
    const body = new Control(document.body, 'main', 'main');
    this.filterContainer = new FilterList(body.node, 'div', 'filters', this.cardState);
    this.filterContainer.draw(this.data);
    this.cardContainer = new CardList(body.node, 'ul', 'cards', this.cartState);
    this.cardContainer.draw(this.data);
    new Footer(document.body, 'footer', 'footer');
  }
}
