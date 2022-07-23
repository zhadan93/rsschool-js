import Control from '../../../helpers/control/htmlControl';
import CardDetails from '../../../types/dataInterface';
import { COLORS } from '../../../../config';
import AppState from '../../../appState';
import { CardState } from '../../../types/stateInterfaces';
import Style from '../../../helpers/style';
import Filter from './filter';

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
      const colorFilter = new Filter(
        colorContainer.node,
        'li',
        `color-list__item color-list__item--${COLORS[color]}`,
        '',
        color
      );
      colorFilter.node.title = `${color}`;

      const colorFilterEl = colorFilter.node;
      const selectedColorClassName = 'color-list__item--active';

      if (this.selectedColorFilters.has(color)) {
        Style.toggleClass(colorFilterEl, selectedColorClassName);
      }

      colorFilterEl.addEventListener('click', () => {
        this.selectedColorFilters = new Set(this.state.data.filters.colors);

        if (this.selectedColorFilters.has(color)) {
          this.selectedColorFilters.delete(color);
          Style.toggleClass(colorFilterEl, selectedColorClassName);
        } else {
          this.selectedColorFilters.add(color);
          Style.toggleClass(colorFilterEl, selectedColorClassName);
        }

        this.state.data.filters.colors = Array.from(this.selectedColorFilters);

        Filter.filterByAll(data, this.state);
      });
    });
  }
}
