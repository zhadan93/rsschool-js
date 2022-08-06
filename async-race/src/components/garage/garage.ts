import HTMLControl from '../helpers/control/htmlControl';
import AppState from '../appState';
import { CarDetails, GarageState } from '../types/dataInterface';
import Cars from './cars';
import GarageChange from './garageChange';
import { PAGE_TITLES } from '../../constants';
import Pagination from '../helpers/pagination';

const { GARAGE_TITLE, PAGINATION_TITLE } = PAGE_TITLES;

export default class Garage extends HTMLControl {
  private containerMap = new Map<string, HTMLControl>();

  constructor(private state: AppState<GarageState>, parentNode: HTMLElement | null, tagName = 'div', className = '') {
    super(parentNode, tagName, className);
  }

  render(data: CarDetails[]): void {
    const garageChange = new GarageChange(this.state, this.node, 'section', 'garage__state-change');
    garageChange.render();

    this.renderGarage(data);
  }

  async renderGarage(data: CarDetails[]): Promise<void> {
    const garageContainer = new HTMLControl(this.node, 'div', 'garage__container');
    const garageContainerId = 'container';
    this.containerMap.get(garageContainerId)?.destroy();
    this.containerMap.set(garageContainerId, garageContainer);

    const { carCount, pageNumber } = this.state.data;
    const garageTitle = new HTMLControl(garageContainer.node, 'h1', 'garage__title', `${GARAGE_TITLE}`);
    (() => new HTMLControl(garageTitle.node, 'span', '', `(${carCount})`))();

    const paginationTitle = new HTMLControl(
      garageContainer.node,
      'h2',
      'garage__pagination-title',
      `${PAGINATION_TITLE}`
    );
    (() => new HTMLControl(paginationTitle.node, 'span', '', `${pageNumber}`))();

    const carsContainer = new Cars(this.state, garageContainer.node, 'section', 'garage__cars');
    carsContainer.render(data);

    const paginationContainer = new Pagination(this.state, garageContainer.node, 'div', 'pagination');
    paginationContainer.render();
  }
}
