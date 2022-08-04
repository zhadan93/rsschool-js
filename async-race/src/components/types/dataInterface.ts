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

export type WinnerCharacteristics = Omit<WinnerDetails, 'id'>;

export type DataDetails = CarDetails | WinnerDetails;

export type DataCharacteristics = CarCharacteristics | WinnerCharacteristics;

export type AddedDataDetails = DataCharacteristics | WinnerDetails;
