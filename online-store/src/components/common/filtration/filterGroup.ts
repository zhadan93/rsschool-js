import Control from '../../helpers/control/htmlControl';
import AppState from '../../appState';
import { CardState } from '../../types/stateInterfaces';
import { FILTER_GROUP_TITLES } from '../../../config';
import FilterByColor from './filters/filterByColor';
import FilterByProducer from './filters/filterByProducer';
import FilterByMaterial from './filters/filterByMaterial';
import CardDetails from '../../types/dataInterface';
import FilterByFavorite from './filters/filterByFavorite';

export default class FilterGroup extends Control {
  private filterMap: Map<string, (data: CardDetails[], filterField: string) => CardDetails[]> = new Map<
    string,
    (data: CardDetails[], filterField: string) => CardDetails[]
  >();

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

    const [byValue /*, byRange, search*/] = FILTER_GROUP_TITLES;
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

      const filterByColorContainer = new FilterByColor(this.node, 'div', 'filters__by-value', 'Цвет:', this.state);
      filterByColorContainer.draw(data, this.filterMap);
      this.filterMap.set('colors', filterByColorContainer.filter);

      const filterByMaterialContainer = new FilterByMaterial(
        this.node,
        'div',
        'filters__by-value',
        'Материал:',
        this.state
      );
      filterByMaterialContainer.draw(data, this.filterMap);
      this.filterMap.set('materials', filterByMaterialContainer.filter);

      const filterByFavoritesContainer = new FilterByFavorite(
        this.node,
        'div',
        'filters__by-value',
        'Только популярные:',
        this.state
      );
      filterByFavoritesContainer.draw(data, this.filterMap);
      this.filterMap.set('favorites', filterByFavoritesContainer.filter);
    } /*else if (title === byRange) {
    } else if (title === search) {
    }*/
  }
}
