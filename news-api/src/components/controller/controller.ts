import AppLoader from './appLoader';
import { SourceList, NewsList } from '../app/interfaces';
import { MyCallback } from '../app/types';

class AppController extends AppLoader {
    getSources(e: MouseEvent, callback?: MyCallback<SourceList>) {
        const target = <HTMLElement>e.target;
        const alphabetContainer = <HTMLElement>e.currentTarget;
        if (target.closest('.alphabet__item')) {
            const letterId = <string>target.getAttribute('data-letter-id');
            if (alphabetContainer.getAttribute('data-alphabet') !== letterId) {
                alphabetContainer.setAttribute('data-alphabet', letterId);
                super.getResp<SourceList>(
                    {
                        endpoint: 'sources',
                    },
                    callback
                );
            }
        }
    }

    getNews(e: MouseEvent, callback: MyCallback<NewsList>) {
        let target = <HTMLElement>e.target;
        const newsContainer = <HTMLElement>e.currentTarget;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = <string>target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<NewsList>(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = <typeof target>target.parentNode;
        }
    }
}

export default AppController;
