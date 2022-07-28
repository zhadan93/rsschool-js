export const HEADER_CONTENT = {
  logoTitle: 'Online Store',
  cartContent: 'Корзина',
};

export const FOOTER_CONTENT = {
  copyright: '©',
  year: '2022',
  github: 'github',
  rss: '',
};

export const FOOTER_LINKS = {
  githubPath: 'https://github.com/zhadan93',
  rssPath: 'https://rs.school/js/',
};

export const CARD_CONTENT = [
  {
    field: 'quantity',
    content: 'Осталось шт.',
  },
  {
    field: 'year',
    content: 'Год выхода:',
  },
  {
    field: 'producer',
    content: 'Производитель:',
  },
  {
    field: 'color',
    content: 'Цвет:',
  },
  {
    field: 'material',
    content: 'Материал корпуса:',
  },
  {
    field: 'favorite',
    content: 'Популярный:',
  },
];

export const ALERTS = {
  fullCartAlert: 'Извините, все слоты заполнены',
  emptyFilterResultAlert: 'Извините, совпадений не найдено',
};

export const COLORS = [
  {
    name: 'beige',
    value: 'бежевый',
  },
  {
    name: 'white',
    value: 'белый',
  },
  {
    name: 'graphite',
    value: 'графитовый',
  },
  {
    name: 'red',
    value: 'красный',
  },
  {
    name: 'silver',
    value: 'серебристый',
  },
  {
    name: 'black',
    value: 'черный',
  },
];

export const MAX_CART_COUNT = 20;

export const FILTER_GROUP_TITLES = ['Фильтры по значению', 'Поиск'];

export const SORT_BY = [
  {
    value: 'name_asc',
    label: 'По названию, от А до Я',
  },
  {
    value: 'name_desc',
    label: 'По названию, от Я до А',
  },
  {
    value: 'year_asc',
    label: 'По году, по возрастанию',
  },
  {
    value: 'year_desc',
    label: 'По году, по убыванию',
  },
  {
    value: 'quantity_asc',
    label: 'По количеству, по возрастанию',
  },
  {
    value: 'quantity_desc',
    label: 'По количеству, по убыванию',
  },
];

export const FILTER_TITLE = {
  filterByProducerTitle: 'Производитель:',
  filterByColorTitle: 'Цвет:',
  filterByMaterialTitle: 'Материал:',
  filterByFavoriteTitle: 'Только популярные:',
  sortingTitle: 'Сортировка',
};

export const RESET_BTN_NAME = {
  resetFilterBtnName: 'Сброс фильтров',
  resetSettingsBtnName: 'Сброс настроек',
};
