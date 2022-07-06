import News from './news/news';
import Sources from './sources/sources';
import Alphabet from './alphabet/alphabet';
import { SourceList, NewsList } from '../app/interfaces';

class AppView {
    private news: News;
    private sources: Sources;
    private alphabet: Alphabet;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
        this.alphabet = new Alphabet();
    }

    drawNews(data?: NewsList): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data?: SourceList): void {
        let values = data?.sources ? data?.sources : [];
        const alphabetContainer = document.querySelector('.alphabet');
        const letterId = alphabetContainer?.getAttribute('data-alphabet') as string;
        values = values.filter((item) => item.name.startsWith(letterId));
        this.sources.draw(values);
    }

    drawAlphabet(data?: string[]): void {
        const values = data?.length ? data : [];
        this.alphabet.draw(values);
    }
}

export default AppView;
