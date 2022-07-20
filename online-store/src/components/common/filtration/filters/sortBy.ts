import Control from '../../../helpers/control/htmlControl';
import AppState from '../../../appState';
import { CardState } from '../../../types/stateInterfaces';
import { SORT_BY } from '../../../../config';
import Filter from './filter';

export default class SortBy extends Control {
  private selectedSort: Set<string> = new Set<string>();

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

    const sortContainerEl = sortContainer.node;
    sortContainerEl.addEventListener('click', (e) => {
      if (e.target instanceof HTMLElement) {
        const { value } = e.target as HTMLOptionElement;
        if (!this.selectedSort.has(value)) {
          this.selectedSort.clear();
          this.selectedSort.add(value);

          const selectedSort = Array.from(this.selectedSort);
          const resData = Filter.sort(this.state.data.resultCardData, value);
          this.state.data = { ...this.state.data, sort: selectedSort, resultCardData: resData };
        }
      }
    });

    SORT_BY.forEach(({ value, label }, index) => {
      const sortOption = new Control<HTMLOptionElement>(sortContainerEl, 'option', 'sort__item', label);
      sortOption.node.value = value;

      if (index === 0) {
        this.selectedSort.add(value);
      }
    });
  }
}
