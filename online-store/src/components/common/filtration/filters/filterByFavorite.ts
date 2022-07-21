import Control from '../../../helpers/control/htmlControl';
import CardDetails from '../../../types/dataInterface';
import AppState from '../../../appState';
import { CardState } from '../../../types/stateInterfaces';
import Filter from './filter';
import Style from '../../../helpers/style';

export default class FilterByFavorite extends Control {
  private selectedFavoriteFilters: Set<string> = new Set<string>();
  private favoriteFilters: Map<string, HTMLInputElement> = new Map<string, HTMLInputElement>();

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
    const favoriteContainer = new Control(this.node, 'div', 'favorite');

    const favoriteFilterLabel = new Control(favoriteContainer.node, 'label', 'favorite__label');
    const favoriteFilterInput = new Control<HTMLInputElement>(favoriteFilterLabel.node, 'input', 'favorite__input');
    favoriteFilterInput.node.type = 'checkbox';
    this.favoriteFilters.set('true', favoriteFilterInput.node);

    const favoriteFilterEl = favoriteFilterLabel.node;
    const selectedFavoriteClassName = 'favorite__item--active';
    favoriteFilterEl.addEventListener('click', () => {
      if (this.selectedFavoriteFilters.has('true')) {
        this.selectedFavoriteFilters.delete('true');
        Style.toggleClass(favoriteFilterEl, selectedFavoriteClassName);
      } else {
        this.selectedFavoriteFilters.add('true');
        Style.toggleClass(favoriteFilterEl, selectedFavoriteClassName);
      }

      const selectedFavorite = Array.from(this.selectedFavoriteFilters);

      const filterNames: Map<string, string[]> = new Map<string, string[]>();

      if (selectedFavorite.length) filterNames.set('favorites', selectedFavorite);

      for (const key in this.state.data) {
        if (
          key !== 'resultCardData' &&
          key !== 'favorites' &&
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

      this.state.data = { ...this.state.data, favorites: selectedFavorite, resultCardData: result };
    });
  }

  filter(data: CardDetails[], filterValue?: string): CardDetails[] {
    return data.filter((item) => '' + item.favorite === filterValue);
  }

  reset() {
    this.state.data.favorites.forEach((favorite) => {
      this.selectedFavoriteFilters.delete(favorite);

      const favoriteFilter = this.favoriteFilters.get(favorite);
      console.log(favoriteFilter);
      if (favoriteFilter) {
        favoriteFilter.checked = false;
      }
    });
  }
}
