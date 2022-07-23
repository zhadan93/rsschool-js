import Control from '../helpers/control/htmlControl';
import CardDetails from '../types/dataInterface';
import CardList from '../common/cards/cardList';
import cardData from '../../data/data';
import Footer from '../common/footer';
import Header from '../common/header';
import AppState from '../appState';
import { CartState, CardState } from '../types/stateInterfaces';
import FilterList from '../common/filtration/filterList';
import LocalStorage from '../helpers/localStorage';
import Filter from '../common/filtration/filters/filter';
import '../helpers/taskCheck';

export default class App {
  private header: Header;
  private cardContainer: CardList;
  private filterContainer: FilterList;
  private cartState: AppState<CartState>;
  private cardState: AppState<CardState>;

  constructor(private data: CardDetails[] = cardData) {
    const savedCartState = LocalStorage.getStorage('savedCartState');
    let initialCartState: CartState = {
      selectedCards: [],
      cartProductCount: 0,
    };

    initialCartState = savedCartState ? savedCartState : initialCartState;
    this.cartState = new AppState<CartState>(initialCartState);
    const updateCart = (data: CartState) => {
      this.header.cartContent = data.cartProductCount;
    };
    this.cartState.onChange.add(updateCart);

    const savedCardState = LocalStorage.getStorage('savedCardState');
    let initialCardState: CardState = {
      filters: {
        colors: [],
        producers: [],
        materials: [],
        favorites: [],
      },
      sort: 'name_asc',
      resultCardData: this.data,
    };
    initialCardState = savedCardState ? { ...savedCardState, resultCardData: this.data } : initialCardState;
    this.cardState = new AppState<CardState>(initialCardState);
    const updateCards = (data: CardState) => {
      if (data.resultCardData) {
        this.cardContainer.draw(data.resultCardData);
      }
    };
    this.cardState.onChange.add(updateCards);

    this.header = new Header(document.body, 'header', 'header', this.cartState);

    const body = new Control(document.body, 'main', 'main');
    this.filterContainer = new FilterList(body.node, 'div', 'filters', this.cardState);
    this.filterContainer.draw(this.data);

    this.cardContainer = new CardList(body.node, 'ul', 'cards', this.cartState);
    Filter.filterByAll(data, this.cardState);

    new Footer(document.body, 'footer', 'footer');
    window.addEventListener('beforeunload', () => {
      LocalStorage.setStorage('savedCartState', this.cartState.data);
      LocalStorage.setStorage('savedCardState', {
        filters: this.cardState.data.filters,
        sort: this.cardState.data.sort,
      });
    });
  }
}
