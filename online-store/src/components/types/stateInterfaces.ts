import CardDetails from './dataInterface';

export interface CartState {
  cartProductCount: number;
}

export interface CardState {
  colors: string[];
  producers: string[];
  materials: string[];
  favorites: string[];
  resultCardData: CardDetails[];
}
