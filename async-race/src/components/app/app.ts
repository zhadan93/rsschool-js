import PageNavigation from '../pageNavigation/pageNavigation';
import HTMLControl from '../helpers/control/htmlControl';
import Garage from '../garage/garage';
import AppState from '../appState';
import { GarageState, PageNavigationState } from '../types/dataInterface';
import apiRequest from '../apiRequest';
import { URLS, carQueriesParams, DEFAULT_VALUES_CAR_INPUTS, APP_PAGES_NAMES } from '../../constants';
import LocalStorage from '../helpers/localStorage';

const { GARAGE_URL } = URLS;
const [GARAGE_PAGE_NAME] = APP_PAGES_NAMES;
const mainContainerId = 'main';

export default class App {
  private containerMap = new Map<string, HTMLControl | null>();

  private garage: Garage;

  private garageState: AppState<GarageState>;

  private pageNavigation: PageNavigation;

  private PageNavigationState: AppState<PageNavigationState>;

  constructor() {
    const savedPageNavigationState = LocalStorage.getStorage('savedPageNavigationState');
    let initialPageNavigationState = {
      selectedPage: GARAGE_PAGE_NAME,
    };
    initialPageNavigationState = savedPageNavigationState || initialPageNavigationState;
    this.PageNavigationState = new AppState<PageNavigationState>(initialPageNavigationState);
    const updatePageNavigationState = async (data: PageNavigationState) => {
      this.containerMap.get(mainContainerId)?.destroy();

      if (data.selectedPage === GARAGE_PAGE_NAME) {
        this.renderGaragePage();
      }
    };

    this.PageNavigationState.onChange.add(updatePageNavigationState);
    this.pageNavigation = new PageNavigation(this.PageNavigationState, null, 'div', 'page-navigation');

    const savedGarageState = LocalStorage.getStorage('savedGarageState');
    let initialGarageState = {
      carCount: 0,
      selectedCar: null,
      carCreating: DEFAULT_VALUES_CAR_INPUTS,
      pageNumber: 1,
      carData: [],
    };
    initialGarageState = savedGarageState ? { ...savedGarageState, carData: [] } : initialGarageState;
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

  async render(): Promise<void> {
    const header = new HTMLControl(document.body, 'header', 'header');
    const mainElement = header.node;

    this.pageNavigation.render();
    mainElement.append(this.pageNavigation.node);

    this.renderGaragePage();
  }

  async renderGaragePage() {
    const main = new HTMLControl(document.body, 'main', 'main');
    const mainElement = main.node;

    carQueriesParams.page = this.garageState.data.pageNumber;

    const { data, count } = await apiRequest.getData(GARAGE_URL, carQueriesParams);
    this.garageState.data.carCount = +count;
    this.garageState.data.carData = data;
    this.garage.render(data);
    mainElement.append(this.garage.node);

    window.addEventListener('beforeunload', () =>
      LocalStorage.setStorage('savedGarageState', {
        carCount: this.garageState.data.carCount,
        selectedCar: this.garageState.data.selectedCar,
        carCreating: this.garageState.data.carCreating,
        pageNumber: this.garageState.data.pageNumber,
      })
    );

    this.containerMap.set(mainContainerId, main);
  }
}
