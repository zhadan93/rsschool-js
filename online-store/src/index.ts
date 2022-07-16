import App from './components/app/app';
import State from './components/types/stateInterface';
import CardState from './components/cardState';
import './style.css';

const initialState: State = {
  cartProductCount: 0,
};

const state = new CardState(initialState);

new App(state);
