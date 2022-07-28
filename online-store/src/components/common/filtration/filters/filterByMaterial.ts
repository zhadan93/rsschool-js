import Control from '../../../helpers/control/htmlControl';
import CardDetails from '../../../types/dataInterface';
import AppState from '../../../appState';
import { CardState } from '../../../types/stateInterfaces';
import Filter from './filter';
import Style from '../../../helpers/style';

const selectedMaterialClassName = 'material-list__item--active';

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

  draw(data: CardDetails[]) {
    const materialContainer = new Control(this.node, 'ul', 'material-list');

    this.selectedMaterialFilters = new Set(this.state.data.filters.materials);

    const materials: string[] = [];
    data.forEach((item) => materials.push(...item.material.split(', ')));

    const uniqueMaterials = Array.from(new Set(materials));
    uniqueMaterials.forEach((material) => {
      const materialFilter = new Filter(materialContainer.node, 'li', 'material-list__item', material, material);

      const materialFilterEl = materialFilter.node;

      if (this.selectedMaterialFilters.has(material)) {
        Style.toggleClass(materialFilterEl, selectedMaterialClassName);
      }

      materialFilterEl.addEventListener('click', () => {
        this.selectedMaterialFilters = new Set(this.state.data.filters.materials);

        this.selectedMaterialFilters.has(material)
          ? this.selectedMaterialFilters.delete(material)
          : this.selectedMaterialFilters.add(material);
        Style.toggleClass(materialFilterEl, selectedMaterialClassName);

        this.state.data.filters.materials = Array.from(this.selectedMaterialFilters);

        Filter.filterByAll(data, this.state);
      });
    });
  }
}
