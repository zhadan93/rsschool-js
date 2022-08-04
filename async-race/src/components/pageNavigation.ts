import HTMLControl from './helpers/control/htmlControl';
import { BTN_NAMES } from '../constants';
import Style from './helpers/style';
import './pageNavigation.css';

const { GARAGE_BTN_NAME, WINNER_BTN_NAME } = BTN_NAMES;
const btnClassName = 'btn';
const activeBtnClassName = 'btn--active';

export default class PageNavigation extends HTMLControl {
  private selectedBtn: Set<HTMLElement> = new Set<HTMLElement>();

  constructor(parentNode: HTMLElement | null, tagName = 'div', className = '') {
    super(parentNode, tagName, className);
  }

  render(): void {
    const garageBtn = new HTMLControl(this.node, 'button', `${btnClassName} ${activeBtnClassName}`, GARAGE_BTN_NAME);
    const garageBtnElement = garageBtn.node;
    garageBtnElement.addEventListener('click', () => {
      this.isSelected(garageBtnElement);
    });

    const winnerBtn = new HTMLControl(this.node, 'button', btnClassName, WINNER_BTN_NAME);
    const winnerBtnElement = winnerBtn.node;
    winnerBtnElement.addEventListener('click', () => {
      this.isSelected(winnerBtnElement);
    });

    this.selectedBtn.add(garageBtnElement);
  }

  isSelected(selectedElement: HTMLElement): void {
    if (!this.selectedBtn.has(selectedElement)) {
      this.selectedBtn.forEach((value) => Style.removeClass(value, activeBtnClassName));
      this.selectedBtn.clear();
      this.selectedBtn.add(selectedElement);
      Style.addClass(selectedElement, activeBtnClassName);
    }
  }
}
