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
  selectedCar: CarDetails | null;
  pageNumber: number;
  carData: CarDetails[];
}

export interface QueryParams {
  page: number;
  limit: number;
}

export interface EngineQueryParams {
  id: number;
  status: string;
}

export interface EngineData {
  velocity: number;
  distance: number;
}

export interface DriveEngineData{
  success: boolean;
}
