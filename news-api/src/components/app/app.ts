import AppController from '../controller/controller';
import AppView from '../view/appView';

class App {
  constructor(private controller: AppController = new AppController(), private view: AppView = new AppView()) {}

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

    this.view.drawAlphabet(romanAlphabet);

    const alphabetContainer = document.querySelector('.alphabet');
    alphabetContainer?.addEventListener('click', (e) =>
      this.controller.getSources(e, (data) => this.view.drawSources(data))
    );

    const sourcesContainer = document.querySelector('.sources');
    sourcesContainer?.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
  }
}

export default App;
