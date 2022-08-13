import HTMLControl from './control/htmlControl';
import { URLS, PAGINATION_BTN_NAMES, carQueriesParams } from '../../constants';
import AppState from '../appState';
import { GarageState } from '../types/dataInterface';
import apiRequest from '../apiRequest';
import Style from './style';

const { PREV_PAGINATION_BTN_NAMES, NEXT_PAGINATION_BTN_NAMES } = PAGINATION_BTN_NAMES;
const { GARAGE_URL } = URLS;
const [paginationBtnClassName, paginationDisabledBtnClassName] = ['btn', 'btn--disabled'];

export default class Pagination extends HTMLControl {
  private buttons = new Map<string, HTMLButtonElement>();

  constructor(private state: AppState<GarageState>, parentNode: HTMLElement | null, tagName = 'div', className = '') {
    super(parentNode, tagName, className);
  }

  render(): void {
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

  async handleEvent(elementName: string): Promise<void> {
    this.state.data.pageNumber += elementName === PREV_PAGINATION_BTN_NAMES ? -1 : 1;

    this.switchButtonState();

    carQueriesParams.page = this.state.data.pageNumber;
    const { data } = await apiRequest.getData(GARAGE_URL, carQueriesParams);
    this.state.data = { ...this.state.data, carData: data };
  }

  switchButtonState(): void {
    const { pageNumber, carCount } = this.state.data;
    const [prev, next] = this.buttons.values();

    const isDisabledPrev = pageNumber === 1;
    const isDisabledNext = this.getPageCount(carCount) === pageNumber || this.getPageCount(carCount) === 0;

    Style.switchDisabledState(prev, isDisabledPrev, paginationDisabledBtnClassName);
    Style.switchDisabledState(next, isDisabledNext, paginationDisabledBtnClassName);
  }

  getPageCount(count: number): number {
    return Math.ceil(count / carQueriesParams.limit);
  }
}
