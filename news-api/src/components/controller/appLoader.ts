import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '3e7440d909a84b6f987620733ba4efc7', // get your key on https://newsapi.org/
        });
    }
}

export default AppLoader;
