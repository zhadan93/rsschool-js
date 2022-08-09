import HTMLControl from '../helpers/control/htmlControl';
import AppState from '../appState';
import { GarageState } from '../types/dataInterface';
import {
  DEFAULT_COLOR,
  MAX_VALUE_COLOR_COMPONENT_RGB,
  BTN_NAMES,
  URLS,
  RANDOM_CARS_COUNT,
  CAR_BRAND,
  CAR_MODEL,
  carQueriesParams,
} from '../../constants';
import InputControl from '../helpers/control/htmlInputControl';
import apiRequest from '../apiRequest';
import Style from '../helpers/style';

const { CREATE_BTN_NAME, UPDATE_BTN_NAME, GENERATE_CARS_BTN_NAME } = BTN_NAMES;
const { GARAGE_URL } = URLS;
const btnDisabledClassName = 'input--disabled';
const inputClassName = 'input';

export default class GarageChange extends HTMLControl {
  private createInputs = new Map<string, HTMLInputElement[]>();

  constructor(private state: AppState<GarageState>, parentNode: HTMLElement | null, tagName = 'div', className = '') {
    super(parentNode, tagName, className);
  }

  render() {
    this.addForm(CREATE_BTN_NAME);
    this.addForm(UPDATE_BTN_NAME);
    this.switchUpdateInputsState();

    const containerButtons = new HTMLControl(this.node, 'div', 'container');
    const containerButtonsElement = containerButtons.node;

    this.generateRandomCars(containerButtonsElement);
  }

  addForm(btnName: string) {
    const form = new HTMLControl(this.node, 'form', 'form');

    const nameCarInput = new InputControl(form.node, `${inputClassName} text-input`, 'text');
    const colorCarInput = new InputControl(form.node, `${inputClassName} color-input`, 'color');
    const submitBtn = new InputControl(form.node, 'btn', 'submit', btnName);
    submitBtn.node.addEventListener('click', async () => {
      const questionBody = {
        name: `${nameCarInput.node.value}`,
        color: `${colorCarInput.node.value}`,
      };
      if (btnName === CREATE_BTN_NAME) {
        const response = await apiRequest.addData(GARAGE_URL, questionBody);
        if (response) {
          this.state.data.carCount += 1;
        }
      } else {
        const id = this.state.data.selectedCar?.id;
        this.state.data.selectedCar = null;

        if (id) {
          await apiRequest.updateData(GARAGE_URL, questionBody, id);
        }
      }
    });
    this.createInputs.set(btnName, [nameCarInput.node, colorCarInput.node, submitBtn.node]);
  }

  switchUpdateInputsState() {
    const { selectedCar } = this.state.data;
    const inputs = this.createInputs.get(UPDATE_BTN_NAME);

    let [inputValues, isDisabled] = [['', DEFAULT_COLOR], true];

    if (selectedCar) {
      isDisabled = false;
      inputValues = Object.values(selectedCar).splice(0, 2);
    }

    inputs?.forEach((input, index) => {
      const updateFormInput = input;
      updateFormInput.disabled = isDisabled;

      const hasClassName = updateFormInput.classList.contains(btnDisabledClassName);
      if ((isDisabled && !hasClassName) || (!isDisabled && hasClassName)) {
        Style.toggleClass(updateFormInput, btnDisabledClassName);
      }

      if (updateFormInput.type !== 'submit') {
        updateFormInput.value = inputValues[index];
      }
    });
  }

  generateRandomCars(parentNode: HTMLElement) {
    const generateBtn = new HTMLControl(parentNode, 'button', 'btn', GENERATE_CARS_BTN_NAME);
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

  getRandomCarName() {
    const randomBrand = this.getRandomNumber(CAR_BRAND.length - 1);
    const brand = CAR_BRAND.at(randomBrand);

    const brandModels = CAR_MODEL[brand as keyof typeof CAR_MODEL];
    const randomModel = this.getRandomNumber(brandModels.length - 1);
    const model = brandModels.at(randomModel);

    return `${brand} ${model}`;
  }

  getRandomCarColor() {
    const rgb = new Array(3)
      .fill(1)
      .map(() => `${this.getRandomNumber(MAX_VALUE_COLOR_COMPONENT_RGB).toString(16)}`)
      .reduce((currentColorComponent, colorComponent) => {
        let color = currentColorComponent;
        color += colorComponent.length === 2 ? colorComponent : `0${colorComponent}`;
        return color;
      }, '#');

    return rgb;
  }

  getRandomNumber(max: number, min = 0) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
}
