import HTMLControl from '../helpers/control/htmlControl';
import AppState from '../appState';
import { DataDetails, GarageState } from '../types/dataInterface';
import Cars from './cars';
import GarageChange from './garageChange';
import { PAGE_TITLES } from '../../constants';

const { GARAGE_TITLE } = PAGE_TITLES;

export default class Garage extends HTMLControl {
  private carCountContainer: HTMLElement;

  set garageTitleContent(carCount: number) {
    this.carCountContainer.textContent = `(${carCount})`;
  }

  constructor(private state: AppState<GarageState>, parentNode: HTMLElement | null, tagName = 'div', className = '') {
    super(parentNode, tagName, className);
    this.carCountContainer = new HTMLControl(null, 'span', '', `(${state.data.carCount})`).node;
  }

  async render(data: DataDetails[]): Promise<void> {
    const garageChange = new GarageChange(this.state, this.node, 'section', 'garage__state-change');
    garageChange.render();

    const garageContainer = new HTMLControl(this.node, 'div', 'garage__container');

    const garageTitle = new HTMLControl(garageContainer.node, 'h1', 'garage__title', `${GARAGE_TITLE}`);
    garageTitle.node.append(this.carCountContainer);

    const carsContainer = new Cars(this.state, garageContainer.node, 'section', 'garage__cars');
    carsContainer.render(data);
  }
}
