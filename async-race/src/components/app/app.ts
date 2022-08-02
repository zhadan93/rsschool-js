import PageNavigation from '../pageNavigation';
import HTMLControl from './helpers/control/htmlControl';

export default class App {
  constructor() {
    const main = new HTMLControl(document.body, 'main', 'main');

    const pageNavigation = new PageNavigation(main.node, 'div', 'navigation');
    pageNavigation.render();
  }
}
