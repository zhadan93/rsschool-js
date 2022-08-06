import HTMLControl from '../helpers/control/htmlControl';
import AppState from '../appState';
import { GarageState } from '../types/dataInterface';
import { BTN_NAMES, URLS } from '../../constants';
import InputControl from '../helpers/control/htmlInputControl';
import apiRequest from '../apiRequest';

const { CREATE_BTN_NAME, UPDATE_BTN_NAME } = BTN_NAMES;
const { GARAGE_URL } = URLS;

export default class GarageChange extends HTMLControl {
  constructor(private state: AppState<GarageState>, parentNode: HTMLElement | null, tagName = 'div', className = '') {
    super(parentNode, tagName, className);
  }

  render() {
    this.addForm(CREATE_BTN_NAME);
    this.addForm(UPDATE_BTN_NAME);
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
}
