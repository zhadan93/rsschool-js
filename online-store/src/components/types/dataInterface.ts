export interface CardDetails {
  id: string;
  name: string;
  quantity: string;
  year: string;
  producer: string;
  color: string;
  material: string;
  favorite: boolean;
}

export type CardKeys = keyof CardDetails;
