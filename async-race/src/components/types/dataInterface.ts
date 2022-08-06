export interface CarDetails {
  name: string;
  color: string;
  id: number;
}

export type CarCharacteristics = Omit<CarDetails, 'id'>;

export interface WinnerDetails {
  id: number;
  wins: number;
  time: number;
}

export interface PaginationCarDetails {
  data: CarDetails[];
  count: string;
}

export interface PaginationWinnerDetails {
  data: WinnerDetails[];
  count: string;
}

export type WinnerCharacteristics = Omit<WinnerDetails, 'id'>;

export type DataDetails = CarDetails & WinnerDetails;

export type PaginationDataDetails = PaginationCarDetails & PaginationWinnerDetails;

export type DataCharacteristics = CarCharacteristics | WinnerCharacteristics;

export type AddedDataDetails = CarCharacteristics | WinnerDetails;

export interface GarageState {
  carCount: number;
  selectedCar: number;
  pageNumber: number;
  carData: CarDetails[];
}

export interface QueryParams {
  page: number;
  limit: number;
}
