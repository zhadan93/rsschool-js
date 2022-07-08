import { ApiRequest, QueryStringParameters, AppOptions } from '../app/interfaces';
import MyCallback from '../app/types';
import Endpoint from '../app/enums';

class Loader {
    constructor(readonly baseLink: string, private options: AppOptions) {}

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

    makeUrl(options: QueryStringParameters, endpoint: Endpoint): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
        });

        return url.slice(0, -1);
    }

    load<T>(method: string, endpoint: Endpoint, callback: MyCallback<T>, options: QueryStringParameters = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res): Promise<T> => res.json())
            .then((data: T): void => callback(data))
            .catch((err: Error): void => console.error(err));
    }
}

export default Loader;
