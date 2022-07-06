import AppController from '../controller/controller';
import AppView from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const romanAlphabet: string[] = [
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
            'K',
            'L',
            'M',
            'N',
            'O',
            'P',
            'Q',
            'R',
            'S',
            'T',
            'U',
            'V',
            'W',
            'X',
            'Y',
            'Z',
        ];

        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e) =>
            this.controller.getNews(e, (data) => this.view.drawNews(data))
        );
        this.view.drawAlphabet(romanAlphabet);
        (document.querySelector('.alphabet') as HTMLElement).addEventListener('click', (e) =>
            this.controller.getSources(e, (data) => this.view.drawSources(data))
        );
    }
}

export default App;
