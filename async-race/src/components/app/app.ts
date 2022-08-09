import PageNavigation from '../pageNavigation/pageNavigation';
import HTMLControl from '../helpers/control/htmlControl';
import Garage from '../garage/garage';
import AppState from '../appState';
import { GarageState } from '../types/dataInterface';
import apiRequest from '../apiRequest';
import { URLS, carQueriesParams } from '../../constants';
import LocalStorage from '../helpers/localStorage';

const { GARAGE_URL } = URLS;

export default class App {
  private garage: Garage;

  private garageState: AppState<GarageState>;

  constructor() {
    const savedGarageState = LocalStorage.getStorage('savedGarageState');
    let initialGarageState = {
      carCount: 0,
      selectedCar: null,
      pageNumber: 1,
      carData: [],
    };
    initialGarageState = savedGarageState || initialGarageState;
    this.garageState = new AppState<GarageState>(initialGarageState);
    const updateGarage = async (data: GarageState) => {
      if (data.selectedCar) {
        this.garage.switchUpdateInputsState();
      }

      this.garage.renderGarage(data.carData);
    };

    this.garageState.onChange.add(updateGarage);

    this.garage = new Garage(this.garageState, null, 'article', 'garage');
  }

  async render() {
    const main = new HTMLControl(document.body, 'main', 'main');

    const pageNavigation = new PageNavigation(main.node, 'div', 'page-navigation');
    pageNavigation.render();

    carQueriesParams.page = this.garageState.data.pageNumber;

    const { data, count } = await apiRequest.getData(GARAGE_URL, carQueriesParams);
    this.garageState.data.carCount = +count;
    this.garageState.data.carData = data;
    this.garage.render(data);
    main.node.append(this.garage.node);

    window.addEventListener('beforeunload', () => LocalStorage.setStorage('savedGarageState', this.garageState.data));
  }
}
