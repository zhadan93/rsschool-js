import { EndpointStrings, QueryStringParameters } from './types';

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
    endpoint: EndpointStrings;
    options?: Partial<QueryStringParameters>;
}
