import PageNavigation from '../pageNavigation';
import HTMLControl from '../helpers/control/htmlControl';
import apiRequest from '../apiRequest';
import { URLS } from '../../constants';

const { GARAGE_URL } = URLS;

export default class App {
  constructor() {
    const main = new HTMLControl(document.body, 'main', 'main');

    const pageNavigation = new PageNavigation(main.node, 'div', 'navigation');
    pageNavigation.render();

    const a = async () => {
      console.log(apiRequest.getData(GARAGE_URL));
    };
    a();
  }
}
