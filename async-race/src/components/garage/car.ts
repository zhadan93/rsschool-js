import HTMLControl from '../helpers/control/htmlControl';
import AppState from '../appState';
import { CarDetails, GarageState } from '../types/dataInterface';
import { URLS, BTN_NAMES, carQueriesParam } from '../../constants';
import apiRequest from '../apiRequest';
import SVGControl from '../helpers/control/svgControl';
import SVGUseControl from '../helpers/control/svgUseControl';
import SVGSprite from '../../assets/svg/sprite.svg';

const { GARAGE_URL } = URLS;
const { SELECT_BTN_NAME, REMOVE_BTN_NAME, ENGINE_START_BTN_NAME, ENGINE_STOP_BTN_NAME } = BTN_NAMES;

export default class Car extends HTMLControl {
  constructor(private state: AppState<GarageState>, parentNode: HTMLElement | null, tagName = 'div', className = '') {
    super(parentNode, tagName, className);
  }

  render(carData: CarDetails) {
    const { name, color, id } = carData;

    const carCharacteristicNavigationContainer = new HTMLControl(this.node, 'div', 'container');

    const selectBtn = new HTMLControl(carCharacteristicNavigationContainer.node, 'button', 'btn', SELECT_BTN_NAME);
    const selectBtnElement = selectBtn.node;
    selectBtnElement.addEventListener('click', async () => {
      await apiRequest.getDataById(GARAGE_URL, id);
      this.state.data.selectedCar = id;
    });

    const removeBtn = new HTMLControl(carCharacteristicNavigationContainer.node, 'button', 'btn', REMOVE_BTN_NAME);
    const removeBtnElement = removeBtn.node;
    removeBtnElement.addEventListener('click', async () => {
      await apiRequest.deleteData(GARAGE_URL, id);

      const { pageNumber, carCount } = this.state.data;

      const currentPageNumber = (carCount - 1) % carQueriesParam.limit ? pageNumber : pageNumber - 1;
      carQueriesParam.page = currentPageNumber;
      const { data, count } = await apiRequest.getData(GARAGE_URL, carQueriesParam);

      this.state.data = { ...this.state.data, pageNumber: currentPageNumber, carCount: +count, carData: data };
    });

    (() => new HTMLControl(carCharacteristicNavigationContainer.node, 'h3', 'garage__car-name', name))();

    const carDrivingContainer = new HTMLControl(this.node, 'div', 'container');
    const engineStartBtn = new HTMLControl(carDrivingContainer.node, 'button', 'btn', ENGINE_START_BTN_NAME);
    const engineStartBtnElement = engineStartBtn.node;
    engineStartBtnElement.addEventListener('click', () => {});

    const engineStoptBtn = new HTMLControl(carDrivingContainer.node, 'button', 'btn', ENGINE_STOP_BTN_NAME);
    const engineStoptBtnElement = engineStoptBtn.node;
    engineStoptBtnElement.addEventListener('click', () => {});

    const carSvg = new SVGControl(carDrivingContainer.node, 'svg', 'car-icon');
    const carUse = new SVGUseControl(`${SVGSprite}#car`, carSvg.node, 'use');
    carUse.node.style.fill = color;
  }
}
