import News from './news/news';
import Sources from './sources/sources';
import Pagination from './pagination/pagination';
import { SourceList, NewsList } from '../app/interfaces';

class AppView {
  constructor(
    private news: News = new News(),
    private sources: Sources = new Sources(),
    private pagination: Pagination = new Pagination()
  ) {}

  drawNews(data: NewsList): void {
    const values = data.articles || [];
    this.news.draw(values);
  }

  drawSources(data: SourceList): void {
    let values = data.sources || [];
    const pagination = document.querySelector('.pagination');
    const letterId = pagination?.getAttribute('data-pagination');

    if (letterId) {
      values = values.filter((item) => item.name.startsWith(letterId));
    }

    this.sources.draw(values);
  }

  drawPagination(data: SourceList): void {
    const values = data.sources || [];
    let paginationData = values.map((item) => item.name[0]);
    paginationData = [...new Set(paginationData)];

    this.pagination.draw(paginationData);
  }

  activePaginationBtn(selectedBtn: Element): void {
    this.pagination.activeElement(selectedBtn);
  }
}

export default AppView;
