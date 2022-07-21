import Control from '../../../helpers/control/htmlControl';
import CardDetails from '../../../types/dataInterface';
import AppState from '../../../appState';
import { CardState } from '../../../types/stateInterfaces';
import Filter from './filter';
import Style from '../../../helpers/style';

export default class FilterByMaterial extends Control {
  private selectedMaterialFilters: Set<string> = new Set<string>();

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
    const materialContainer = new Control(this.node, 'ul', 'material-list');

    const materials: string[] = [];
    data.forEach((item) => materials.push(...item.material.split(', ')));

    const uniqueMaterials = Array.from(new Set(materials));
    uniqueMaterials.forEach((material) => {
      const materialFilter = new Control(materialContainer.node, 'li', 'material-list__item', material);

      const materialFilterEl = materialFilter.node;
      const selectedMaterialClassName = 'material-list__item--active';
      materialFilterEl.addEventListener('click', () => {
        if (this.selectedMaterialFilters.has(material)) {
          this.selectedMaterialFilters.delete(material);
          Style.toggleClass(materialFilterEl, selectedMaterialClassName);
        } else {
          this.selectedMaterialFilters.add(material);
          Style.toggleClass(materialFilterEl, selectedMaterialClassName);
        }

        const selectedMaterials = Array.from(this.selectedMaterialFilters);

        const filterNames: Map<string, string[]> = new Map<string, string[]>();
        if (selectedMaterials.length) filterNames.set('materials', selectedMaterials);

        for (const key in this.state.data) {
          if (
            key !== 'resultCardData' &&
            key !== 'materials' &&
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
          result = Array.from(new Set(result)).sort((data1, data2) => +data1.id - +data2.id);
        }

        result = filterNames.size ? result : data;

        if (result.length) {
          result = Filter.sort(result, this.state.data.sort[0]);
        }

        this.state.data = { ...this.state.data, materials: selectedMaterials, resultCardData: result };
      });
    });
  }

  filter(data: CardDetails[], filterField: string): CardDetails[] {
    return data.filter((item) => item.material.split(', ').includes(filterField));
  }
}
