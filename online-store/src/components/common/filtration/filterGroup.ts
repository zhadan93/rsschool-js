import Control from '../../helpers/control/htmlControl';
import { CartAndCardState } from '../../types/stateInterfaces';
import FilterByColor from './filters/filterByColor';
import FilterByProducer from './filters/filterByProducer';
import FilterByMaterial from './filters/filterByMaterial';
import CardDetails from '../../types/dataInterface';
import FilterByFavorite from './filters/filterByFavorite';
import SortBy from './filters/sortBy';
import Filter from './filters/filter';
import { FILTER_TITLE, FILTER_GROUP_TITLES, RESET_BTN_NAME } from '../../../constants';

const [filterContainerClassName, resetBtnClassName] = ['filters__by-value', 'reset-btn'];
const [byValueTitle, searchTitle] = FILTER_GROUP_TITLES;
const { filterByProducerTitle, filterByColorTitle, filterByMaterialTitle, filterByFavoriteTitle, sortingTitle } =
  FILTER_TITLE;
const { resetFilterBtnName, resetSettingsBtnName } = RESET_BTN_NAME;

export default class FilterGroup extends Control {
  constructor(
    parentNode: HTMLElement,
    tagName = 'div',
    className = '',
    title = '',
    data: CardDetails[],
    private state: CartAndCardState
  ) {
    super(parentNode, tagName, className);
    new Control(this.node, 'h3', 'filters__title', title);

    if (title === byValueTitle) {
      const filterByProducerContainer = new FilterByProducer(
        this.node,
        'div',
        `${filterContainerClassName} filters__by-value--producer`,
        filterByProducerTitle,
        this.state.cardState
      );
      filterByProducerContainer.draw(data);

      const filterByColorContainer = new FilterByColor(
        this.node,
        'div',
        filterContainerClassName,
        filterByColorTitle,
        this.state.cardState
      );
      filterByColorContainer.draw(data);

      const filterByMaterialContainer = new FilterByMaterial(
        this.node,
        'div',
        `${filterContainerClassName} filters__by-value--material`,
        filterByMaterialTitle,
        this.state.cardState
      );
      filterByMaterialContainer.draw(data);

      const filterByFavoritesContainer = new FilterByFavorite(
        this.node,
        'div',
        filterContainerClassName,
        filterByFavoriteTitle,
        this.state.cardState
      );
      filterByFavoritesContainer.draw(data);
    }

    if (title === searchTitle) {
      const search = new Control<HTMLInputElement>(this.node, 'input', 'search');
      search.node.focus();
      search.node.placeholder = 'Введите текст';
      search.node.autocomplete = 'off';

      new Control(this.node, 'h3', 'filters__title', sortingTitle);
      const sorting = new SortBy(this.node, 'div', filterContainerClassName, '', this.state.cardState);
      sorting.draw();

      const resetBtnContainer = new Control(this.node, 'div', 'reset-container');
      const resetFilterBtn = new Control(resetBtnContainer.node, 'button', resetBtnClassName, resetFilterBtnName);
      resetFilterBtn.node.addEventListener('click', () => {
        const result = Filter.sort(data, this.state.cardState.data.sort);

        Filter.resetFilters(this.state.cardState);

        this.state.cardState.data = {
          ...this.state.cardState.data,
          resultCardData: result,
        };
      });

      const resetStorageBtn = new Control(resetBtnContainer.node, 'button', resetBtnClassName, resetSettingsBtnName);
      resetStorageBtn.node.addEventListener('click', () => {
        Filter.resetFilters(this.state.cardState);
        const resultData = Filter.resetSortToDefault(data, this.state.cardState);

        this.state.cartState.data = {
          ...this.state.cardState.data,
          selectedCards: [],
          cartProductCount: 0,
        };
        this.state.cardState.data = {
          ...this.state.cardState.data,
          resultCardData: resultData,
        };
      });
    }
  }
}
