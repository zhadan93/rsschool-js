import { BASE_URL, REQUEST_HEADER } from '../constants';
import {
  DataDetails,
  DataCharacteristics,
  AddedDataDetails,
  QueryParams,
  PaginationDataDetails,
} from './types/dataInterface';

class ApiRequest {
  constructor(private baseUrl = BASE_URL) {}

  async getDataById(url: string, id: number): Promise<DataDetails> {
    const response = await fetch(`${this.baseUrl}${url}/${id}`);
    const dataById = await response.json();
    return dataById;
  }

  async getData(url: string, queryParams: QueryParams): Promise<PaginationDataDetails> {
    const path = this.makeUrl(url, queryParams);
    const response = await fetch(path);

    const count = response.headers.get('X-Total-Count') || '0';
    const data = await response.json();

    return {
      data,
      count,
    };
  }

  async addData(url: string, body: AddedDataDetails): Promise<void> {
    await fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: REQUEST_HEADER,
    });
  }

  async updateData(url: string, body: DataCharacteristics, id: number): Promise<void> {
    await fetch(`${this.baseUrl}${url}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: REQUEST_HEADER,
    });
  }

  async deleteData(url: string, id: number): Promise<void> {
    await fetch(`${this.baseUrl}${url}/${id}`, {
      method: 'DELETE',
    });
  }

  makeUrl(url: string, options: QueryParams): string {
    const urlOptions = { ...options };
    let path = `${this.baseUrl}${url}?`;

    Object.keys(urlOptions).forEach((key) => {
      path += `_${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
    });

    return path.slice(0, -1);
  }
}

const apiRequest = new ApiRequest();

export default apiRequest;
