import Control from '../../../helpers/control/htmlControl';
import CardDetails from '../../../types/dataInterface';
import { COLORS } from '../../../../config';
import AppState from '../../../appState';
import { CardState } from '../../../types/stateInterfaces';
import Style from '../../../helpers/style';
import Filter from './filter';
//import Filtration from './filter';

export default class FilterByColor extends Control {
  private selectedColorFilters: Set<string> = new Set<string>();

  constructor(
    parentNode: HTMLElement,
    tagName = 'div',
    className = '',
    content = '',
    private state: AppState<CardState>
  ) {
    super(parentNode, tagName, className, content);
  }

  draw(data: CardDetails[], filterMap: Map<string, (data: CardDetails[], filterField: string) => CardDetails[]>) {
    const colorContainer = new Control(this.node, 'ul', 'color-list');

    const colors: string[] = [];
    data.forEach((item) => colors.push(...item.color.split(', ')));

    const uniqueColors = Array.from(new Set(colors));
    uniqueColors.forEach((color) => {
      const colorFilter = new Control(colorContainer.node, 'li', `color-list__item color-list__item--${COLORS[color]}`);
      colorFilter.node.title = `${color}`;

      const colorFilterEl = colorFilter.node;
      const selectedColorClassName = 'color-list__item--active';
      colorFilterEl.addEventListener('click', () => {
        if (this.selectedColorFilters.has(color)) {
          this.selectedColorFilters.delete(color);
          Style.toggleClass(colorFilterEl, selectedColorClassName);
        } else {
          this.selectedColorFilters.add(color);
          Style.toggleClass(colorFilterEl, selectedColorClassName);
        }

        const selectedColors = Array.from(this.selectedColorFilters);

        const filterNames: Map<string, string[]> = new Map<string, string[]>();
        if (selectedColors.length) filterNames.set('colors', selectedColors);

        for (const key in this.state.data) {
          if (
            key !== 'resultCardData' &&
            key !== 'colors' &&
            key !== 'sort' &&
            this.state.data[key as keyof typeof this.state.data].length
          ) {
            filterNames.set(key, this.state.data[key as keyof typeof this.state.data] as string[]);
          }
        }

        let initialData = data;
        let result: CardDetails[] = [];
        let count = 0;

        for (const [key, value] of filterNames) {
          count++;
          const f = filterMap.get(key);
          if (count > 1) {
            initialData = [...result];
            result = [];
          }

          if (f) {
            value.forEach((filterValue) => {
              result.push(...f(initialData, filterValue));
            });
          }
        }

        if (result.length) {
          result = Array.from(new Set(result));
        }

        result = filterNames.size ? result : data;

        if (result.length) {
          result = Filter.sort(result, this.state.data.sort[0]);
        }

        this.state.data = { ...this.state.data, colors: selectedColors, resultCardData: result };
      });
    });
  }

  filter(data: CardDetails[], filterField: string): CardDetails[] {
    return data.filter((item) => item.color.split(', ').includes(filterField));
  }
}
