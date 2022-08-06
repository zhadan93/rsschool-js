export const BTN_NAMES = {
  GARAGE_BTN_NAME: 'To Garage',
  WINNER_BTN_NAME: 'To Winners',
  SELECT_BTN_NAME: 'Select',
  REMOVE_BTN_NAME: 'Remove',
  ENGINE_START_BTN_NAME: 'A',
  ENGINE_STOP_BTN_NAME: 'B',
  CREATE_BTN_NAME: 'Create',
  UPDATE_BTN_NAME: 'Update',
};

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

export const carQueriesParam = {
  page: 0,
  limit: PAGINATION_LIMIT.GARAGE_PAGINATION_LIMIT,
};
