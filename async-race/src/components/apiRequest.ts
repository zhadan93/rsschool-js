import { BASE_URL, REQUEST_HEADER } from '../constants';
import {
  DataDetails,
  DataCharacteristics,
  AddedDataDetails,
  QueryParams,
  PaginationDataDetails,
  EngineQueryParams,
  EngineData,
  DriveEngineData,
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

  async addData(url: string, body: AddedDataDetails): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: REQUEST_HEADER,
    });

    const isSuccess = response.status === 200;
    return isSuccess;
  }

  async updateData(url: string, body: DataCharacteristics, id: number): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}${url}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: REQUEST_HEADER,
    });
    const isSuccess = response.status === 200;
    return isSuccess;
  }

  async deleteData(url: string, id: number): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}${url}/${id}`, {
      method: 'DELETE',
    });

    const isSuccess = response.status === 200;
    return isSuccess;
  }

  async startOrStopEngine(url: string, queryParams: EngineQueryParams): Promise<EngineData> {
    const path = this.makeUrl(url, queryParams);
    const response = await fetch(path, {
      method: 'PATCH',
    });

    const engineData = await response.json();
    return engineData;
  }

  async switchEngineToDriveMode(url: string, queryParams: EngineQueryParams): Promise<DriveEngineData> {
    const path = this.makeUrl(url, queryParams);
    const response = await fetch(path, {
      method: 'PATCH',
    });

    if (response.status === 500) {
      return {
        success: false,
      };
    }

    const data = await response.json();
    return data;
  }

  makeUrl(url: string, options: QueryParams | EngineQueryParams): string {
    const prefix = url === '/engine' ? '' : '_';
    let path = `${this.baseUrl}${url}?`;

    Object.keys(options).forEach((key) => {
      path += `${prefix}${key}=${options[key as keyof typeof options]}&`;
    });

    return path.slice(0, -1);
  }
}

const apiRequest = new ApiRequest();

export default apiRequest;
