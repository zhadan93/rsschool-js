import HTMLControl from '../helpers/control/htmlControl';
import AppState from '../appState';
import { GarageState } from '../types/dataInterface';
import {
  MAX_VALUE_COLOR_COMPONENT_RGB,
  BTN_NAMES,
  URLS,
  RANDOM_CARS_COUNT,
  CAR_MODELS,
  carQueriesParams,
  DEFAULT_VALUES_CAR_INPUTS,
} from '../../constants';
import InputControl from '../helpers/control/htmlInputControl';
import apiRequest from '../apiRequest';
import Style from '../helpers/style';

const { CREATE_BTN_NAME, UPDATE_BTN_NAME, GENERATE_CARS_BTN_NAME, RACE_BTN_NAME, RESET_BTN_NAME } = BTN_NAMES;
const { GARAGE_URL } = URLS;
const [inputClassName, disabledBtnClassName] = ['input', 'input--disabled'];

export default class GarageChange extends HTMLControl {
  private inputs = new Map<string, HTMLInputElement[]>();

  constructor(private state: AppState<GarageState>, parentNode: HTMLElement | null, tagName = 'div', className = '') {
    super(parentNode, tagName, className);
  }

  render() {
    this.addForm(CREATE_BTN_NAME);
    this.switchInputsValues(CREATE_BTN_NAME);

    this.addForm(UPDATE_BTN_NAME);
    this.switchUpdateInputsState();

    const containerButtons = new HTMLControl(this.node, 'div', 'container');
    const containerButtonsElement = containerButtons.node;

    (() => new HTMLControl(containerButtonsElement, 'button', 'btn', RACE_BTN_NAME))();

    (() => new HTMLControl(containerButtonsElement, 'button', 'btn', RESET_BTN_NAME))();

    const generateBtn = new HTMLControl(containerButtonsElement, 'button', 'btn', GENERATE_CARS_BTN_NAME);
    const generateBtnElement = generateBtn.node;
    generateBtnElement.addEventListener('click', this.generateRandomCars.bind(this));
  }

  addForm(btnName: string) {
    const form = new HTMLControl(this.node, 'form', 'form');

    const nameCarInput = new InputControl(form.node, `${inputClassName} text-input`, 'text');
    const nameCarInputElement = nameCarInput.node;

    const colorCarInput = new InputControl(form.node, `${inputClassName} color-input`, 'color');
    const colorCarInputElement = colorCarInput.node;

    const submitBtn = new InputControl(form.node, 'btn', 'submit', btnName);

    const { carCreating, selectedCar } = this.state.data;
    const inputValue = btnName === CREATE_BTN_NAME ? carCreating : selectedCar;

    nameCarInputElement.addEventListener('input', () => {
      if (inputValue) {
        inputValue.name = nameCarInputElement.value;
      }
    });

    colorCarInputElement.addEventListener('change', () => {
      if (inputValue) {
        inputValue.color = colorCarInputElement.value;
      }
    });

    submitBtn.node.addEventListener('click', async () => {
      const questionBody = {
        name: `${nameCarInputElement.value}`,
        color: `${colorCarInputElement.value}`,
      };
      if (btnName === CREATE_BTN_NAME) {
        await apiRequest.addData(GARAGE_URL, questionBody);
        this.state.data.carCreating = DEFAULT_VALUES_CAR_INPUTS;
      } else {
        const id = this.state.data.selectedCar?.id;
        this.state.data.selectedCar = null;

        if (id) {
          await apiRequest.updateData(GARAGE_URL, questionBody, id);
        }
      }
    });

    this.inputs.set(btnName, [nameCarInputElement, colorCarInputElement, submitBtn.node]);
  }

  switchUpdateInputsState(): void {
    const { selectedCar } = this.state.data;
    const inputs = this.inputs.get(UPDATE_BTN_NAME);
    const isDisabled = selectedCar === null;

    inputs?.forEach((input) => {
      Style.switchDisabledState(input, isDisabled, disabledBtnClassName);
    });

    this.switchInputsValues(UPDATE_BTN_NAME);
  }

  switchInputsValues(btnName: string) {
    const inputValues = this.getInputValues(btnName);
    const inputs = this.inputs.get(btnName);

    inputs?.forEach((input, index) => {
      const updateFormInput = input;

      if (updateFormInput.type !== 'submit') {
        updateFormInput.value = inputValues[index];
      }
    });
  }

  getInputValues(btnName: string): string[] {
    let [name, color] = Object.values(DEFAULT_VALUES_CAR_INPUTS);
    const inputValues = btnName === UPDATE_BTN_NAME ? this.state.data.selectedCar : this.state.data.carCreating;

    if (inputValues) {
      [name, color] = Object.values(inputValues);
    }

    return [name, color];
  }

  generateRandomCars(): void {
    const promises = [...Array(RANDOM_CARS_COUNT)].map(() => {
      const queryParams = {
        name: this.getRandomCarName(),
        color: this.getRandomCarColor(),
      };

      return apiRequest.addData(GARAGE_URL, queryParams);
    });

    Promise.all(promises)
      .then(() => apiRequest.getData(GARAGE_URL, carQueriesParams))
      .then(({ data, count }) => {
        this.state.data = { ...this.state.data, carData: data, carCount: +count };
      });
  }

  getRandomCarName(): string {
    const carBrands = Object.entries(CAR_MODELS);
    const randomBrand = this.getRandomNumber(carBrands.length - 1);
    const carBrand = carBrands.at(randomBrand);

    let carName = '';

    if (carBrand) {
      const [brand, models] = carBrand;
      const randomModel = this.getRandomNumber(models.length - 1);
      const model = models.at(randomModel);
      carName = `${brand} ${model}`;
    }

    return carName;
  }

  getRandomCarColor(): string {
    const rgb = [...new Array(3)]
      .map(() => `${this.getRandomNumber(MAX_VALUE_COLOR_COMPONENT_RGB).toString(16)}`)
      .reduce((currentColorComponent, colorComponent) => {
        let color = currentColorComponent;
        color += colorComponent.length === 2 ? colorComponent : `0${colorComponent}`;
        return color;
      }, '#');

    return rgb;
  }

  getRandomNumber(max: number, min = 0): number {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
}
