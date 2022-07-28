import Control from '../../helpers/control/htmlControl';
import FilterGroup from './filterGroup';
import CardDetails from '../../types/dataInterface';
import { CartAndCardState } from '../../types/stateInterfaces';
import { FILTER_GROUP_TITLES } from '../../../constants';
import './filters.css';

export default class FilterList extends Control {
  constructor(parentNode: HTMLElement, tagName = 'div', className = '', private state: CartAndCardState) {
    super(parentNode, tagName, className);
  }

  draw(data: CardDetails[]) {
    FILTER_GROUP_TITLES.forEach(
      (title) => new FilterGroup(this.node, 'div', 'filters__group', title, data, this.state)
    );
  }
}
