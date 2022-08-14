import { CardDetails } from './dataInterface';
import AppState from '../appState';

export interface CartState {
  selectedCards: string[];
  cartProductCount: number;
}

export interface FilterState {
  colors: string[];
  producers: string[];
  materials: string[];
  favorites: string[];
}
export interface CardState {
  filters: FilterState;
  sort: string;
  resultCardData: CardDetails[];
}

export interface CartAndCardState {
  cartState: AppState<CartState>;
  cardState: AppState<CardState>;
}
