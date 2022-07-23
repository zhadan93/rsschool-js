import CardDetails from './dataInterface';

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
