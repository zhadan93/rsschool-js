import Control from '../../../helpers/control/htmlControl';
import CardDetails from '../../../types/dataInterface';
import AppState from '../../../appState';
import { CardState } from '../../../types/stateInterfaces';
import Filter from './filter';
import Style from '../../../helpers/style';

export default class FilterByProducer extends Control {
  private selectedProducerFilters: Set<string> = new Set<string>();
  private producerFilters: Map<string, HTMLElement> = new Map<string, HTMLElement>();

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
    const producerContainer = new Control(this.node, 'ul', 'producer-list');

    const producers: string[] = [];
    data.forEach((item) => producers.push(...item.producer.split(', ')));

    const uniqueProducer = Array.from(new Set(producers));
    uniqueProducer.forEach((producer) => {
      const producerFilter = new Control(producerContainer.node, 'li', 'producer-list__item', `${producer}`);
      this.producerFilters.set(producer, producerFilter.node);

      const producerFilterEl = producerFilter.node;
      const selectedProducerClassName = 'producer-list__item--active';
      producerFilterEl.addEventListener('click', () => {
        if (this.selectedProducerFilters.has(producer)) {
          this.selectedProducerFilters.delete(producer);
          Style.toggleClass(producerFilterEl, selectedProducerClassName);
        } else {
          this.selectedProducerFilters.add(producer);
          Style.toggleClass(producerFilterEl, selectedProducerClassName);
        }

        const selectedProducers = Array.from(this.selectedProducerFilters);

        const filterNames: Map<string, string[]> = new Map<string, string[]>();
        if (selectedProducers.length) filterNames.set('producers', selectedProducers);

        for (const key in this.state.data) {
          if (
            key !== 'resultCardData' &&
            key !== 'producers' &&
            key !== 'sort' &&
            this.state.data[key as keyof typeof this.state.data].length
          ) {
            filterNames.set(key, this.state.data[key as keyof typeof this.state.data] as string[]);
          }
        }

        let result: CardDetails[] = [];
        let initialData = data;
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
          result = Array.from(new Set(result)).sort((data1, data2) => +data1.id - +data2.id);
        }

        result = filterNames.size ? result : data;

        if (result.length) {
          result = Filter.sort(result, this.state.data.sort[0]);
        }

        this.state.data = { ...this.state.data, producers: selectedProducers, resultCardData: result };
      });
    });
  }

  filter(data: CardDetails[], filterValue: string): CardDetails[] {
    return data.filter((item) => item.producer === filterValue);
  }

  reset() {
    this.state.data.producers.forEach((producer) => {
      this.selectedProducerFilters.delete(producer);

      const producerFilter = this.producerFilters.get(producer);
      if (producerFilter) {
        Style.toggleClass(producerFilter, 'producer-list__item--active');
      }
    });
  }
}
