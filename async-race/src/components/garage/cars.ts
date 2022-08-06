import HTMLControl from '../helpers/control/htmlControl';
import { DataDetails, GarageState } from '../types/dataInterface';
import AppState from '../appState';
import Car from './car';

export default class Cars extends HTMLControl {
  constructor(private state: AppState<GarageState>, parentNode: HTMLElement | null, tagName = 'div', className = '') {
    super(parentNode, tagName, className);
  }

  render(data: DataDetails[]) {
    data.forEach((carData) => {
      const carContainer = new Car(this.state, this.node, 'div', 'garage__car');
      carContainer.render(carData);
    });
  }
}
