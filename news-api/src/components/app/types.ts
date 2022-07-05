import Endpoints from './enums';

export type AppOptions = {
    apiKey: string;
};

export type MyCallback<T> = (data?: T) => void;

export type EndpointStrings = keyof typeof Endpoints;

export type QueryStringParameters = {
    sources: string;
};
