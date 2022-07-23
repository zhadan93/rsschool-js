import CardDetails from '../../../types/dataInterface';
import AppState from '../../../appState';
import { CardState } from '../../../types/stateInterfaces';
import Control from '../../../helpers/control/htmlControl';
import Style from '../../../helpers/style';

export default class Filter<NodeType extends HTMLElement> extends Control<NodeType> {
  private static filters: Map<string, HTMLElement> = new Map<string, HTMLElement>();

  constructor(parentNode: HTMLElement, tagName = 'div', className = '', content = '', filterName: string) {
    super(parentNode, tagName, className, content);
    Filter.filters.set(filterName, this.node);
  }

  static sort(data: CardDetails[], sortType: string) {
    const [sortField, direction] = sortType.split('_');
    let callback: (data1: CardDetails, data2: CardDetails) => number;

    if (isFinite(+data[0][sortField as keyof typeof data[0]])) {
      callback = (data1: CardDetails, data2: CardDetails) => {
        return direction === 'asc'
          ? +data1[sortField as keyof typeof data1] - +data2[sortField as keyof typeof data2]
          : +data2[sortField as keyof typeof data2] - +data1[sortField as keyof typeof data1];
      };
    } else {
      callback = (data1: CardDetails, data2: CardDetails) => {
        if (data1[sortField as keyof typeof data1] > data2[sortField as keyof typeof data2]) {
          return direction === 'asc' ? 1 : -1;
        }
        if (data1[sortField as keyof typeof data1] < data2[sortField as keyof typeof data2]) {
          return direction === 'asc' ? -1 : 1;
        }
        return 0;
      };
    }

    return data.sort(callback);
  }

  static filterByAll(data: CardDetails[], state: AppState<CardState>) {
    const filterNames: Map<string, string[]> = new Map(
      Object.entries(state.data.filters).filter(([, value]) => value.length)
    );
    let initialData = data;
    let result: CardDetails[] = [];
    let count = 0;

    for (const [key, value] of filterNames) {
      count++;

      if (count > 1) {
        initialData = [...result];
        result = [];
      }

      value.forEach((filterValue) => {
        result.push(...Filter.filterBy(initialData, key.slice(0, -1), filterValue));
      });
    }

    if (result.length) {
      result = Array.from(new Set(result));
    }

    result = filterNames.size ? result : data;

    if (result.length) {
      result = Filter.sort(result, state.data.sort);
    }

    state.data = { ...state.data, resultCardData: result };
  }

  static resetFilters(state: AppState<CardState>) {
    Object.entries(state.data.filters)
      .filter(([, value]) => value.length)
      .forEach(([filterGroup, filterNames]) => {
        (filterNames as string[]).forEach((filterName) => {
          const filter = Filter.filters.get(filterName);

          if (filter) {
            if (filter instanceof HTMLInputElement) {
              filter.checked = false;
            } else {
              const className = filterGroup.slice(0, -1) + '-list__item--active';
              Style.toggleClass(filter, className);
            }
          }
        });
        state.data.filters[filterGroup as keyof typeof state.data.filters] = [];
      });
  }

  static resetSortToDefault(data: CardDetails[], state: AppState<CardState>) {
    state.data.sort = 'name_asc';
    const sortEl = Filter.filters.get(state.data.sort);

    if (sortEl instanceof HTMLOptionElement) {
      sortEl.selected = true;
    }

    return Filter.sort(data, state.data.sort);
  }

  static filterBy(data: CardDetails[], filterField: string, filterName: string) {
    return data.filter((item) => {
      const value = item[filterField as keyof typeof item];

      if (typeof value === 'boolean') {
        return '' + value === filterName;
      } else {
        return value.split(', ').includes(filterName);
      }
    });
  }
}
