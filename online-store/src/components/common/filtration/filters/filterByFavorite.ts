import Control from '../../../helpers/control/htmlControl';
import CardDetails from '../../../types/dataInterface';
import AppState from '../../../appState';
import { CardState } from '../../../types/stateInterfaces';
import Filter from './filter';
import Style from '../../../helpers/style';

export default class FilterByFavorite extends Control {
  private selectedFavoriteFilters: Set<string> = new Set<string>();

  constructor(
    parentNode: HTMLElement,
    tagName = 'div',
    className = '',
    content = '',
    private state: AppState<CardState>
  ) {
    super(parentNode, tagName, className, content);
  }

  draw(data: CardDetails[]) {
    const favoriteContainer = new Control(this.node, 'div', 'true');

    this.selectedFavoriteFilters = new Set(this.state.data.filters.favorites);

    const favoriteFilterLabel = new Control(favoriteContainer.node, 'label', 'favorite__label');
    const favoriteFilterInput = new Filter<HTMLInputElement>(
      favoriteFilterLabel.node,
      'input',
      'favorite__input',
      '',
      'true'
    );
    favoriteFilterInput.node.type = 'checkbox';

    const favoriteFilterEl = favoriteFilterLabel.node;
    const selectedFavoriteClassName = 'favorite__item--active';

    if (this.selectedFavoriteFilters.has('true')) {
      Style.toggleClass(favoriteFilterEl, selectedFavoriteClassName);
      favoriteFilterInput.node.checked = true;
    }

    favoriteFilterEl.addEventListener('click', () => {
      this.selectedFavoriteFilters = new Set(this.state.data.filters.favorites);

      if (this.selectedFavoriteFilters.has('true')) {
        this.selectedFavoriteFilters.delete('true');
        Style.toggleClass(favoriteFilterEl, selectedFavoriteClassName);
      } else {
        this.selectedFavoriteFilters.add('true');
        Style.toggleClass(favoriteFilterEl, selectedFavoriteClassName);
      }

      this.state.data.filters.favorites = Array.from(this.selectedFavoriteFilters);

      Filter.filterByAll(data, this.state);
    });
  }
}
