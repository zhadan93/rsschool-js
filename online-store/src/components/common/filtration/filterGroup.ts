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
  private filterMap: Map<string, (data: CardDetails[], filterField: string) => CardDetails[]> = new Map<
    string,
    (data: CardDetails[], filterField: string) => CardDetails[]
  >();
  private static filtersReset: Map<string, () => void> = new Map<string, () => void>();

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
      filterByProducerContainer.draw(data, this.filterMap);
      this.filterMap.set('producers', filterByProducerContainer.filter);
      FilterGroup.filtersReset.set('producers', filterByProducerContainer.reset.bind(filterByProducerContainer));

      const filterByColorContainer = new FilterByColor(this.node, 'div', 'filters__by-value', 'Цвет:', this.state);
      filterByColorContainer.draw(data, this.filterMap);
      this.filterMap.set('colors', filterByColorContainer.filter);
      FilterGroup.filtersReset.set('colors', filterByColorContainer.reset.bind(filterByColorContainer));

      const filterByMaterialContainer = new FilterByMaterial(
        this.node,
        'div',
        'filters__by-value',
        'Материал:',
        this.state
      );
      filterByMaterialContainer.draw(data, this.filterMap);
      this.filterMap.set('materials', filterByMaterialContainer.filter);
      FilterGroup.filtersReset.set('materials', filterByMaterialContainer.reset.bind(filterByMaterialContainer));

      const filterByFavoritesContainer = new FilterByFavorite(
        this.node,
        'div',
        'filters__by-value',
        'Только популярные:',
        this.state
      );
      filterByFavoritesContainer.draw(data, this.filterMap);
      this.filterMap.set('favorites', filterByFavoritesContainer.filter);
      FilterGroup.filtersReset.set('favorites', filterByFavoritesContainer.reset.bind(filterByFavoritesContainer));
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
        const result = Filter.sort(data, this.state.data.sort[0]);

        const colorFilterReset = FilterGroup.filtersReset.get('colors');
        if (colorFilterReset) colorFilterReset();

        const producerFilterReset = FilterGroup.filtersReset.get('producers');
        if (producerFilterReset) producerFilterReset();

        const materialFilterReset = FilterGroup.filtersReset.get('materials');
        if (materialFilterReset) materialFilterReset();

        const favoriteFilterReset = FilterGroup.filtersReset.get('favorites');
        if (favoriteFilterReset) favoriteFilterReset();

        this.state.data = {
          ...this.state.data,
          colors: [],
          producers: [],
          materials: [],
          favorites: [],
          resultCardData: result,
        };
      });
    }
  }
}
