import AppLoader from './appLoader';
import { SourceList, NewsList } from '../app/interfaces';
import MyCallback from '../app/types';
import Endpoints from '../app/enums';

class AppController extends AppLoader {
  getSources(e: Event, callback: MyCallback<SourceList>): void {
    const target = e.target;
    const alphabetContainer = e.currentTarget;

    if (target instanceof Element && target.closest('.alphabet__item')) {
      const letterId = target.getAttribute('data-letter-id');

      if (
        alphabetContainer instanceof Element &&
        alphabetContainer.getAttribute('data-alphabet') !== letterId &&
        letterId
      ) {
        const letter = document.querySelector('.alphabet__item_active');
        letter?.classList.toggle('alphabet__item_active');
        target.classList.toggle('alphabet__item_active');
        alphabetContainer.setAttribute('data-alphabet', letterId);
        super.getResp<SourceList>(
          {
            endpoint: Endpoints.sources,
          },
          callback
        );
      }
    }
  }

  getNews(e: Event, callback: MyCallback<NewsList>): void {
    const target = e.target;
    const newsContainer = e.currentTarget;

    if (target instanceof Element) {
      const sourcesItem = target.closest('.source__item');
      const sourceId = sourcesItem?.getAttribute('data-source-id');

      if (newsContainer instanceof Element && newsContainer.getAttribute('data-source') !== sourceId && sourceId) {
        newsContainer.setAttribute('data-source', sourceId);
        super.getResp<NewsList>(
          {
            endpoint: Endpoints.everything,
            options: {
              sources: sourceId,
            },
          },
          callback
        );
      }
    }
  }
}

export default AppController;
