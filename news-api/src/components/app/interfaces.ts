import Endpoints from './enums';

export interface NewsDetails {
  source: Pick<SourceDetails, 'id' | 'name'>;
  author: string | null;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  urlToImage: string;
}

export interface NewsList {
  status: string;
  totalResults: number;
  articles: NewsDetails[];
}

export interface SourceDetails {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  country: string;
  language: string;
}

export interface SourceList {
  status: string;
  sources: SourceDetails[];
}

export interface ApiRequest {
  endpoint: Endpoints;
  options?: QueryStringParameters;
}

export interface QueryStringParameters {
  sources?: string;
}

export interface AppOptions {
  apiKey: string;
}
