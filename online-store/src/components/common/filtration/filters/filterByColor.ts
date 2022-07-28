import Control from '../../../helpers/control/htmlControl';
import CardDetails from '../../../types/dataInterface';
import { COLORS } from '../../../../constants';
import AppState from '../../../appState';
import { CardState } from '../../../types/stateInterfaces';
import Style from '../../../helpers/style';
import Filter from './filter';

const selectedColorClassName = 'color-list__item--active';

export default class FilterByColor extends Control {
  private selectedColorFilters: Set<string> = new Set<string>();

  constructor(
    parentNode: HTMLElement,
    tagName = 'div',
    className = '',
    content = '',
    protected state: AppState<CardState>
  ) {
    super(parentNode, tagName, className, content);
  }

  draw(data: CardDetails[]) {
    const colorContainer = new Control(this.node, 'ul', 'color-list');

    this.selectedColorFilters = new Set(this.state.data.filters.colors);

    const colors: string[] = [];
    data.forEach((item) => colors.push(...item.color.split(', ')));

    const uniqueColors = Array.from(new Set(colors));
    uniqueColors.forEach((color) => {
      const colorName = COLORS.find(({ value }) => value === color)?.name;
      const colorFilter = new Filter(
        colorContainer.node,
        'li',
        `color-list__item color-list__item--${colorName}`,
        '',
        color
      );
      colorFilter.node.title = `${color}`;

      const colorFilterEl = colorFilter.node;

      if (this.selectedColorFilters.has(color)) {
        Style.toggleClass(colorFilterEl, selectedColorClassName);
      }

      colorFilterEl.addEventListener('click', () => {
        this.selectedColorFilters = new Set(this.state.data.filters.colors);

        this.selectedColorFilters.has(color)
          ? this.selectedColorFilters.delete(color)
          : this.selectedColorFilters.add(color);
        Style.toggleClass(colorFilterEl, selectedColorClassName);

        this.state.data.filters.colors = Array.from(this.selectedColorFilters);

        Filter.filterByAll(data, this.state);
      });
    });
  }
}
