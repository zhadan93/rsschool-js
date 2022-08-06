import PageNavigation from '../pageNavigation/pageNavigation';
import HTMLControl from '../helpers/control/htmlControl';
import Garage from '../garage/garage';
import AppState from '../appState';
import { GarageState } from '../types/dataInterface';
import apiRequest from '../apiRequest';
import { URLS, carQueriesParam } from '../../constants';

const { GARAGE_URL } = URLS;

export default class App {
  private garage: Garage;

  private garageState: AppState<GarageState>;

  constructor() {
    const initialGarageState = {
      carCount: 0,
      selectedCar: 0,
      pageNumber: 1,
      carData: [],
    };

    this.garageState = new AppState<GarageState>(initialGarageState);
    const updateGarage = async (data: GarageState) => {
      this.garage.renderGarage(data.carData);
    };

    this.garageState.onChange.add(updateGarage);

    this.garage = new Garage(this.garageState, null, 'article', 'garage');
  }

  async render() {
    const main = new HTMLControl(document.body, 'main', 'main');

    const pageNavigation = new PageNavigation(main.node, 'div', 'page-navigation');
    pageNavigation.render();

    carQueriesParam.page = this.garageState.data.pageNumber;

    const { data, count } = await apiRequest.getData(GARAGE_URL, carQueriesParam);
    this.garageState.data.carCount = +count;
    this.garage.render(data);
    main.node.append(this.garage.node);
  }
}
