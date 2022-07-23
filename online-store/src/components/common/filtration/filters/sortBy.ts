import Control from '../../../helpers/control/htmlControl';
import AppState from '../../../appState';
import { CardState } from '../../../types/stateInterfaces';
import { SORT_BY } from '../../../../config';
import Filter from './filter';
import CardDetails from '../../../types/dataInterface';

export default class SortBy extends Control {
  private selectedSort = '';

  constructor(
    parentNode: HTMLElement,
    tagName = 'div',
    className = '',
    content = '',
    private state: AppState<CardState>
  ) {
    super(parentNode, tagName, className, content);
  }

  draw() {
    const sortContainer = new Control(this.node, 'select', 'sort');
    this.selectedSort = this.state.data.sort;

    const sortContainerEl = sortContainer.node;
    sortContainerEl.addEventListener('click', (e) => {
      if (e.target instanceof HTMLElement) {
        const { value } = e.target as HTMLOptionElement;
        if (this.selectedSort !== value) {
          this.selectedSort = value;

          const currentData = this.state.data.resultCardData;
          let resData: CardDetails[] = [];

          if (currentData.length) resData = Filter.sort(currentData, value);

          this.state.data = { ...this.state.data, sort: this.selectedSort, resultCardData: resData };
        }
      }
    });

    SORT_BY.forEach(({ value, label }) => {
      const sortOption = new Control<HTMLOptionElement>(sortContainerEl, 'option', 'sort__item', label);
      if (this.selectedSort === value) {
        sortOption.node.selected = true;
      }

      sortOption.node.value = value;
    });
  }
}
