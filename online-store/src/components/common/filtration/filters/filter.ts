import CardDetails from '../../../types/dataInterface';

export default class Filter {
  static sort(data: CardDetails[], sortType: string) {
    const [sortField, direction] = sortType.split('_');
    let callback: (data1: CardDetails, data2: CardDetails) => number;

    if (isFinite(+data[0][sortField as keyof typeof data[0]])) {
      callback = (data1: CardDetails, data2: CardDetails) => {
        return direction === 'asc'
          ? +data1[sortField as keyof typeof data1] - +data2[sortField as keyof typeof data2]
          : +data2[sortField as keyof typeof data2] - +data1[sortField as keyof typeof data1];
      };
    } else {
      callback = (data1: CardDetails, data2: CardDetails) => {
        if (data1[sortField as keyof typeof data1] > data2[sortField as keyof typeof data2]) {
          return direction === 'asc' ? 1 : -1;
        }
        if (data1[sortField as keyof typeof data1] < data2[sortField as keyof typeof data2]) {
          return direction === 'asc' ? -1 : 1;
        }
        return 0;
      };
    }

    return data.sort(callback);
  }
}
