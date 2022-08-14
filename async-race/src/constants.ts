export const BTN_NAMES = {
  GARAGE_BTN_NAME: 'To Garage',
  WINNER_BTN_NAME: 'To Winners',
  SELECT_BTN_NAME: 'Select',
  REMOVE_BTN_NAME: 'Remove',
  ENGINE_START_BTN_NAME: 'A',
  ENGINE_STOP_BTN_NAME: 'B',
  CREATE_BTN_NAME: 'Create',
  UPDATE_BTN_NAME: 'Update',
  GENERATE_CARS_BTN_NAME: 'Generate Cars',
  RACE_BTN_NAME: 'Race',
  RESET_BTN_NAME: 'Reset',
};

export const DEFAULT_COLOR = '#ffffff';

export const BASE_URL = 'http://127.0.0.1:3000';

export const URLS = {
  GARAGE_URL: '/garage',
  WINNER_URL: '/winners',
  ENGINE_URL: '/engine',
};

export const REQUEST_HEADER = {
  'Content-Type': 'application/json',
};

export const PAGE_TITLES = {
  GARAGE_TITLE: 'Garage',
  WINNER_TITLE: 'Winners',
  PAGINATION_TITLE: 'Page #',
};

export const PAGINATION_LIMIT = {
  GARAGE_PAGINATION_LIMIT: 7,
  WINNERS_PAGINATION_LIMIT: 10,
};

export const PAGINATION_BTN_NAMES = {
  PREV_PAGINATION_BTN_NAMES: 'Prev',
  NEXT_PAGINATION_BTN_NAMES: 'Next',
};

export const carQueriesParams = {
  page: 0,
  limit: PAGINATION_LIMIT.GARAGE_PAGINATION_LIMIT,
};

export const CAR_MODELS = {
  Audi: ['A3', 'A5', 'Q3', 'A8', 'Q5', 'SQ8', 'E-tron', 'S5', 'RS 6', 'A6'],
  BMW: ['M2', 'X7', 'M8', 'M5', 'X3', '6 Gran Turismo', 'X1', '8 Gran Coupe', '7', 'X4'],
  Ford: ['Explorer', 'Fiesta', 'Focus', 'Mondeo', 'Kuga', 'Ranger', 'ST', 'Galaxy', 'Edge', 'Wagon'],
  Honda: ['Pilot', 'CR-V', 'Civic', 'Accord', 'Acty', 'Airwave', 'Amaze', 'Ballade', 'Breeze', 'BR-V'],
  Mitsubishi: [
    'ASX',
    'Pajero Sport',
    'Eclipse Cross',
    'Outlander',
    'L200',
    'Attrage',
    'Colt',
    'Galant',
    'Grandis',
    'Space Star',
  ],
  Kia: ['Rio', 'Cerato', 'K900', 'K5', 'Picanto', 'Stinger', 'Soul', 'Mohave', 'Seltos', 'Carnival'],
  Mazda: ['CX-30', 'CX-5', 'CX-9', '6', 'CX-9 NOIR', 'CX-5 NOIR', 'CX-3', 'CX-4', 'CX-7', 'MX-5'],
  Lexus: ['LC', 'LS', 'ES', 'UX', 'NX', 'GX', 'LX', 'RX', 'LF-1 Limitless', 'LF-SA'],
  Hyundai: ['Solaris', 'Elantra', 'Sonata', 'i30', 'Palisade', 'Creta', 'Tucson', 'Santa Fe Premium', 'H1', 'Staria'],
  Volkswagen: [
    'Polo',
    'Jetta',
    'Passat',
    'Golf',
    'Teramont',
    'Tiguan',
    'Touareg',
    'Transporter',
    'Crafter',
    'Multivan',
  ],
};

export const RANDOM_CARS_COUNT = 100;

export const MAX_VALUE_COLOR_COMPONENT_RGB = 255;

export const DEFAULT_VALUES_CAR_INPUTS = {
  name: '',
  color: '#ffffff',
};
