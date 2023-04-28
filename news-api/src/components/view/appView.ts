import News from './news/news';
import Sources from './sources/sources';
import Alphabet from './alphabet/alphabet';
import { SourceList, NewsList } from '../app/interfaces';

class AppView {
  constructor(
    private news: News = new News(),
    private sources: Sources = new Sources(),
    private alphabet: Alphabet = new Alphabet()
  ) {}

  drawNews(data: NewsList): void {
    const values = data.articles || [];
    this.news.draw(values);
  }

  drawSources(data: SourceList): void {
    let values = data.sources || [];
    const alphabetContainer = document.querySelector('.alphabet');
    const letterId = alphabetContainer?.getAttribute('data-alphabet');

    if (letterId) {
      values = values.filter((item) => item.name.startsWith(letterId));
    }

    this.sources.draw(values);
  }

  drawAlphabet(data: string[]): void {
    this.alphabet.draw(data);
  }
}

export default AppView;
