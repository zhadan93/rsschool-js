import AppController from '../controller/controller';
import AppView from '../view/appView';

class App {
  constructor(private controller: AppController = new AppController(), private view: AppView = new AppView()) {}

  start() {
    const sources = document.querySelector('.sources');

    this.controller.getSources((data) => {
      this.view.drawPagination(data);
      const pagination = document.querySelector('.pagination');

      pagination?.addEventListener('click', (e) => {
        const target = e.target;

        if (target instanceof Element && target.closest('.pagination__item')) {
          const letterId = target.getAttribute('data-letter-id');

          if (pagination instanceof Element && pagination.getAttribute('data-pagination') !== letterId && letterId) {
            this.view.activePaginationBtn(target);
            pagination.setAttribute('data-pagination', letterId);
            this.controller.getSources((data) => {
              this.view.drawSources(data);
            });
          }
        }
      });
    });

    sources?.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
  }
}

export default App;
