import HTMLControl from '../helpers/control/htmlControl';
import AppState from '../appState';
import { CarDetails, GarageState } from '../types/dataInterface';
import Cars from './cars';
import GarageChange from './garageChange';
import { PAGE_TITLES } from '../../constants';
import Pagination from '../helpers/pagination';

const { GARAGE_TITLE, PAGINATION_TITLE } = PAGE_TITLES;
const garageContainerId = 'carsContainer';
const garagePageContainerId = 'garageContainer';

export default class Garage extends HTMLControl {
  private containerMap = new Map<string, HTMLControl>();

  private garageChangeSet = new Set<GarageChange>();

  constructor(private state: AppState<GarageState>, parentNode: HTMLElement | null, tagName = 'div', className = '') {
    super(parentNode, tagName, className);
  }

  render(data: CarDetails[]): void {
    const garagePageContainer = new HTMLControl(this.node, 'div');
    const garagePageContainerElement = garagePageContainer.node;

    this.containerMap.get(garagePageContainerId)?.destroy();
    this.containerMap.set(garagePageContainerId, garagePageContainer);

    const garageChange = new GarageChange(this.state, garagePageContainerElement, 'section', 'garage__state-change');
    garageChange.render();
    this.garageChangeSet.add(garageChange);

    this.renderGarage(data);
  }

  async renderGarage(data: CarDetails[]): Promise<void> {
    const carsParentNode = this.containerMap.get(garagePageContainerId)?.node;

    if (carsParentNode) {
      const garageContainer = new HTMLControl(carsParentNode, 'section', 'garage__container');
      const garageContainerElement = garageContainer.node;

      this.containerMap.get(garageContainerId)?.destroy();
      this.containerMap.set(garageContainerId, garageContainer);

      const { carCount, pageNumber } = this.state.data;
      const garageTitle = new HTMLControl(garageContainerElement, 'h1', 'title', `${GARAGE_TITLE}`);
      (() => new HTMLControl(garageTitle.node, 'span', '', `(${carCount})`))();

      const paginationTitle = new HTMLControl(garageContainerElement, 'h2', 'pagination__title', `${PAGINATION_TITLE}`);
      (() => new HTMLControl(paginationTitle.node, 'span', '', `${pageNumber}`))();

      const carsContainer = new Cars(this.state, garageContainerElement, 'div', 'garage__cars');
      carsContainer.render(data);

      const paginationContainer = new Pagination(this.state, garageContainerElement, 'div', 'pagination');
      paginationContainer.render();
    }
  }

  switchUpdateInputsState() {
    const [garageChange] = Array.from(this.garageChangeSet);

    if (garageChange) {
      garageChange.switchUpdateInputsState();
    }
  }
}
