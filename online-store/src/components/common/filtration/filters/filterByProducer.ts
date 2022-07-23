import Control from '../../../helpers/control/htmlControl';
import CardDetails from '../../../types/dataInterface';
import AppState from '../../../appState';
import { CardState } from '../../../types/stateInterfaces';
import Filter from './filter';
import Style from '../../../helpers/style';

export default class FilterByProducer extends Control {
  private selectedProducerFilters: Set<string> = new Set<string>();

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
    const producerContainer = new Control(this.node, 'ul', 'producer-list');

    this.selectedProducerFilters = new Set(this.state.data.filters.producers);

    const producers: string[] = [];
    data.forEach((item) => producers.push(...item.producer.split(', ')));

    const uniqueProducer = Array.from(new Set(producers));
    uniqueProducer.forEach((producer) => {
      const producerFilter = new Filter(producerContainer.node, 'li', 'producer-list__item', producer, producer);

      const producerFilterEl = producerFilter.node;
      const selectedProducerClassName = 'producer-list__item--active';

      if (this.selectedProducerFilters.has(producer)) {
        Style.toggleClass(producerFilterEl, selectedProducerClassName);
      }

      producerFilterEl.addEventListener('click', () => {
        this.selectedProducerFilters = new Set(this.state.data.filters.producers);

        if (this.selectedProducerFilters.has(producer)) {
          this.selectedProducerFilters.delete(producer);
          Style.toggleClass(producerFilterEl, selectedProducerClassName);
        } else {
          this.selectedProducerFilters.add(producer);
          Style.toggleClass(producerFilterEl, selectedProducerClassName);
        }

        this.state.data.filters.producers = Array.from(this.selectedProducerFilters);

        Filter.filterByAll(data, this.state);
      });
    });
  }
}
