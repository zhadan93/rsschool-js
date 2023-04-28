import Img from '../../../assets/img/news_placeholder.jpg';
import './news.css';
import { NewsDetails } from '../../app/interfaces';

class News {
  draw(data: NewsDetails[]): void {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

    if (newsItemTemp) {
      news.forEach((item, idx) => {
        const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;
        const newsCloneItem = newsClone.querySelector<HTMLElement>('.news__item');

        if (idx % 2) newsCloneItem?.classList.add('alt');

        const newsClonePhoto = newsClone.querySelector<HTMLElement>('.news__meta-photo');

        if (newsClonePhoto) {
          newsClonePhoto.style.backgroundImage = `url(${item.urlToImage || Img})`;
        }

        const newsCloneAuthor = newsClone.querySelector('.news__meta-author');

        if (newsCloneAuthor) {
          newsCloneAuthor.textContent = item.author || item.source.name;
        }

        const newsCloneDate = newsClone.querySelector('.news__meta-date');

        if (newsCloneDate) {
          newsCloneDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
        }

        const newsCloneTitle = newsClone.querySelector('.news__description-title');

        if (newsCloneTitle) {
          newsCloneTitle.textContent = item.title;
        }

        const newsCloneSource = newsClone.querySelector('.news__description-source');

        if (newsCloneSource) {
          newsCloneSource.textContent = item.source.name;
        }

        const newsCloneContent = newsClone.querySelector('.news__description-content');

        if (newsCloneContent) {
          newsCloneContent.textContent = item.description;
        }

        const newsCloneReadMore = newsClone.querySelector('.news__read-more a');
        newsCloneReadMore?.setAttribute('href', item.url);

        fragment.append(newsClone);
      });

      const newsContainer = document.querySelector('.news');

      if (newsContainer) {
        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
      }
    }
  }
}

export default News;
