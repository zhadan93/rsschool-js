import Control from '../../helpers/control/htmlControl';
import AppState from '../../appState';
import { CardState } from '../../types/stateInterfaces';
import { FILTER_GROUP_TITLES } from '../../../config';
import FilterByColor from './filters/filterByColor';
import FilterByProducer from './filters/filterByProducer';
import FilterByMaterial from './filters/filterByMaterial';
import CardDetails from '../../types/dataInterface';
import FilterByFavorite from './filters/filterByFavorite';
import SortBy from './filters/sortBy';
import Filter from './filters/filter';

export default class FilterGroup extends Control {
  constructor(
    parentNode: HTMLElement,
    tagName = 'div',
    className = '',
    title = '',
    data: CardDetails[],
    private state: AppState<CardState>
  ) {
    super(parentNode, tagName, className);
    new Control(this.node, 'h3', 'filters__title', title);

    const [byValue, /*, byRange,*/ search] = FILTER_GROUP_TITLES;
    if (title === byValue) {
      const filterByProducerContainer = new FilterByProducer(
        this.node,
        'div',
        'filters__by-value',
        'Производитель:',
        this.state
      );
      filterByProducerContainer.draw(data);

      const filterByColorContainer = new FilterByColor(this.node, 'div', 'filters__by-value', 'Цвет:', this.state);
      filterByColorContainer.draw(data);

      const filterByMaterialContainer = new FilterByMaterial(
        this.node,
        'div',
        'filters__by-value',
        'Материал:',
        this.state
      );
      filterByMaterialContainer.draw(data);

      const filterByFavoritesContainer = new FilterByFavorite(
        this.node,
        'div',
        'filters__by-value',
        'Только популярные:',
        this.state
      );
      filterByFavoritesContainer.draw(data);
    } else if (title === search) {
      const search = new Control<HTMLInputElement>(this.node, 'input', 'search');
      search.node.focus();
      search.node.placeholder = 'Введите текст';
      search.node.autocomplete = 'off';

      new Control(this.node, 'h3', 'filters__title', 'Сортировка');
      const sorting = new SortBy(this.node, 'div', 'filters__by-value', '', this.state);
      sorting.draw();

      const resetBtn = new Control(this.node, 'button', 'reset', 'Сброс фильтров');
      resetBtn.node.addEventListener('click', () => {
        const result = Filter.sort(data, this.state.data.sort);

        Filter.resetFilters(this.state);

        this.state.data = {
          ...this.state.data,
          resultCardData: result,
        };
      });
    }
  }
}
