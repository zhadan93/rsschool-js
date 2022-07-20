export const MAX_CART_COUNT = 20;

export const COLORS: { [key: string]: string } = {
  бежевый: 'beige',
  белый: 'white',
  графитовый: 'graphite',
  красный: 'red',
  серебристый: 'silver',
  черный: 'black',
};

export const FILTER_GROUP_TITLES = ['Фильтры по значению', /*'Фильтры по диапазону',*/ 'Поиск'];

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
