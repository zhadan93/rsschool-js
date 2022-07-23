import Control from '../../helpers/control/htmlControl';
import FilterGroup from './filterGroup';
//import FilterByFavorite from './filters/filterByFavorite';
//import FilterByMaterial from './filters/filterByMaterial';
import CardDetails from '../../types/dataInterface';
import AppState from '../../appState';
import { CardState } from '../../types/stateInterfaces';
import { FILTER_GROUP_TITLES } from '../../../config';
import './filters.css';

export default class FilterList extends Control {
  constructor(parentNode: HTMLElement, tagName = 'div', className = '', private state: AppState<CardState>) {
    super(parentNode, tagName, className);
  }

  draw(data: CardDetails[]) {
    FILTER_GROUP_TITLES.forEach(
      (title) => new FilterGroup(this.node, 'div', 'filters__group', title, data, this.state)
    );
  }
}
