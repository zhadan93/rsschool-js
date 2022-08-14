import HTMLControl from '../helpers/control/htmlControl';
import { BTN_NAMES } from '../../constants';
import Style from '../helpers/style';
import { PageNavigationState } from '../types/dataInterface';
import AppState from '../appState';
import './pageNavigation.css';

const { GARAGE_BTN_NAME, WINNER_BTN_NAME } = BTN_NAMES;
const btnClassName = 'btn';
const activeBtnClassName = 'btn--active';

export default class PageNavigation extends HTMLControl {
  private selectedBtn: Set<HTMLElement> = new Set<HTMLElement>();

  constructor(
    private state: AppState<PageNavigationState>,
    parentNode: HTMLElement | null,
    tagName = 'div',
    className = ''
  ) {
    super(parentNode, tagName, className);
  }

  render(): void {
    const garageBtn = new HTMLControl(this.node, 'button', `${btnClassName} ${activeBtnClassName}`, GARAGE_BTN_NAME);
    const garageBtnElement = garageBtn.node;
    garageBtnElement.addEventListener('click', () => {
      this.changeStyle(garageBtnElement);
      this.state.data = { ...this.state.data, selectedPage: 'garage' };
    });

    const winnerBtn = new HTMLControl(this.node, 'button', btnClassName, WINNER_BTN_NAME);
    const winnerBtnElement = winnerBtn.node;
    winnerBtnElement.addEventListener('click', () => {
      this.changeStyle(winnerBtnElement);
      this.state.data = { ...this.state.data, selectedPage: 'winners' };
    });

    this.selectedBtn.add(garageBtnElement);
  }

  changeStyle(selectedElement: HTMLElement): void {
    if (!this.selectedBtn.has(selectedElement)) {
      const [prevSelectedBtn] = this.selectedBtn.values();
      Style.removeClass(prevSelectedBtn, activeBtnClassName);
      this.selectedBtn.delete(prevSelectedBtn);
      this.selectedBtn.add(selectedElement);
      Style.addClass(selectedElement, activeBtnClassName);
    }
  }
}
