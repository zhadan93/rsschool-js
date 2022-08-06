import HTMLControl from './control/htmlControl';
import { URLS, PAGINATION_BTN_NAMES, carQueriesParam } from '../../constants';
import AppState from '../appState';
import { GarageState } from '../types/dataInterface';
import apiRequest from '../apiRequest';

const { PREV_PAGINATION_BTN_NAMES, NEXT_PAGINATION_BTN_NAMES } = PAGINATION_BTN_NAMES;
const { GARAGE_URL } = URLS;
const paginationBtnClassName = 'pagination__btn';

export default class Pagination extends HTMLControl {
  private buttons = new Map<string, HTMLButtonElement>();

  constructor(private state: AppState<GarageState>, parentNode: HTMLElement | null, tagName = 'div', className = '') {
    super(parentNode, tagName, className);
  }

  render() {
    const prevPaginationBtn = new HTMLControl<HTMLButtonElement>(
      this.node,
      'button',
      paginationBtnClassName,
      PREV_PAGINATION_BTN_NAMES
    );
    const prevPaginationBtnElement = prevPaginationBtn.node;

    this.buttons.set(PREV_PAGINATION_BTN_NAMES, prevPaginationBtnElement);
    prevPaginationBtnElement.addEventListener('click', () => {
      this.handleEvent(PREV_PAGINATION_BTN_NAMES);
    });

    const nextPaginationBtn = new HTMLControl<HTMLButtonElement>(
      this.node,
      'button',
      paginationBtnClassName,
      NEXT_PAGINATION_BTN_NAMES
    );
    const nextPaginationBtnElement = nextPaginationBtn.node;

    this.buttons.set(NEXT_PAGINATION_BTN_NAMES, nextPaginationBtnElement);
    nextPaginationBtnElement.addEventListener('click', () => {
      this.handleEvent(NEXT_PAGINATION_BTN_NAMES);
    });

    this.switchButtonState();
  }

  async handleEvent(elementName: string) {
    this.state.data.pageNumber += elementName === PREV_PAGINATION_BTN_NAMES ? -1 : 1;

    this.switchButtonState();

    carQueriesParam.page = this.state.data.pageNumber;
    const { data } = await apiRequest.getData(GARAGE_URL, carQueriesParam);
    this.state.data = { ...this.state.data, carData: data };
  }

  switchButtonState(): void {
    const { pageNumber, carCount } = this.state.data;
    const [prev, next] = this.buttons.values();

    console.log(pageNumber, carCount);
    prev.disabled = pageNumber === 1;
    next.disabled = Math.ceil(carCount / carQueriesParam.limit) === pageNumber;
  }
}
