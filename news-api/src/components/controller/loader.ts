import { ApiRequest } from '../app/interfaces';
import { AppOptions, EndpointStrings, MyCallback } from '../app/types';

class Loader {
    readonly baseLink: string;
    private options: AppOptions;

    constructor(baseLink: string, options: AppOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(
        { endpoint, options = {} }: ApiRequest,
        callback: MyCallback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: { [index: string]: string }, endpoint: EndpointStrings): string {
        const urlOptions: { [index: string]: string } = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<T>(
        method: string,
        endpoint: EndpointStrings,
        callback: MyCallback<T>,
        options: { [index: string]: string } = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res): Promise<T> => res.json())
            .then((data: T): void => callback(data))
            .catch((err: Error): void => console.error(err));
    }
}

export default Loader;
