import HTMLControl from '../helpers/control/htmlControl';
import AppState from '../appState';
import { GarageState } from '../types/dataInterface';
import { BTN_NAMES, URLS, RANDOM_CARS_COUNT, CAR_BRAND, CAR_MODEL, carQueriesParams } from '../../constants';
import InputControl from '../helpers/control/htmlInputControl';
import apiRequest from '../apiRequest';

const { CREATE_BTN_NAME, UPDATE_BTN_NAME, GENERATE_CARS_BTN_NAME } = BTN_NAMES;
const { GARAGE_URL } = URLS;

export default class GarageChange extends HTMLControl {
  constructor(private state: AppState<GarageState>, parentNode: HTMLElement | null, tagName = 'div', className = '') {
    super(parentNode, tagName, className);
  }

  render() {
    this.addForm(CREATE_BTN_NAME);
    this.addForm(UPDATE_BTN_NAME);

    const containerButtons = new HTMLControl(this.node, 'div', 'container');

    const generateBtn = new HTMLControl(containerButtons.node, 'button', 'btn', GENERATE_CARS_BTN_NAME);
    const generateBtnElement = generateBtn.node;
    generateBtnElement.addEventListener('click', () => {
      const promises = [];
      for (let i = 0; i < RANDOM_CARS_COUNT; i += 1) {
        const queryParams = {
          name: this.getRandomCarName(),
          color: this.getRandomCarColor(),
        };
        const request = apiRequest.addData(GARAGE_URL, queryParams);
        promises.push(request);
      }
      Promise.all(promises)
        .then(() => apiRequest.getData(GARAGE_URL, carQueriesParams))
        .then(({ data, count }) => {
          this.state.data = { ...this.state.data, carData: data, carCount: +count };
        });
    });
  }

  addForm(btnName: string) {
    const form = new HTMLControl(this.node, 'form', 'form');
    const nameCarInput = new InputControl(form.node, 'input', 'text');
    const colorCarInput = new InputControl(form.node, 'input', 'color');
    const btn = new InputControl(form.node, 'btn', 'submit', btnName);
    btn.node.addEventListener('click', async () => {
      const questionBody = {
        name: `${nameCarInput.node.value}`,
        color: `${colorCarInput.node.value}`,
      };
      if (btnName === CREATE_BTN_NAME) {
        await apiRequest.addData(GARAGE_URL, questionBody);
        const count = this.state.data.carCount + 1;
        this.state.data = { ...this.state.data, carCount: count };
      } else {
        await apiRequest.updateData(GARAGE_URL, questionBody, this.state.data.selectedCar);
      }
    });
  }

  getRandomCarName() {
    const randomBrand = this.getRandomNumber(CAR_BRAND.length - 1);
    const brand = CAR_BRAND.at(randomBrand);

    const brandModels = CAR_MODEL[brand as keyof typeof CAR_MODEL];
    const randomModel = this.getRandomNumber(brandModels.length - 1);
    const model = brandModels.at(randomModel);

    return `${brand} ${model}`;
  }

  getRandomCarColor() {
    const colorCombinationCount = 255 ** 3;
    const random = this.getRandomNumber(colorCombinationCount);
    return `#${random.toString(16)}`;
  }

  getRandomNumber(max: number, min = 0) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
}
