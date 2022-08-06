import PageNavigation from '../pageNavigation/pageNavigation';
import HTMLControl from '../helpers/control/htmlControl';
import Garage from '../garage/garage';
import AppState from '../appState';
import { GarageState } from '../types/dataInterface';
import apiRequest from '../apiRequest';
import { URLS } from '../../constants';

const { GARAGE_URL } = URLS;

export default class App {
  private garage: Garage;

  private garageState: AppState<GarageState>;

  constructor() {
    const initialGarageState = {
      carCount: 0,
      selectedCar: 0,
    };

    this.garageState = new AppState<GarageState>(initialGarageState);
    const updateGarage = (data: GarageState) => {
      this.garage.garageTitleContent = data.carCount;
    };
    this.garageState.onChange.add(updateGarage);

    this.garage = new Garage(this.garageState, null, 'article', 'garage');
  }

  async render() {
    const main = new HTMLControl(document.body, 'main', 'main');

    const pageNavigation = new PageNavigation(main.node, 'div', 'page-navigation');
    pageNavigation.render();

    const appData = await apiRequest.getData(GARAGE_URL);

    this.garageState.data = { ...this.garageState.data, carCount: appData.length };
    this.garage.render(appData);
    main.node.append(this.garage.node);
  }
}
