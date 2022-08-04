import { BASE_URL, REQUEST_HEADER } from '../constants';
import { DataDetails, DataCharacteristics, AddedDataDetails } from './types/dataInterface';

class ApiRequest {
  constructor(private baseUrl = BASE_URL) {}

  async getDataById(url: string, id: number): Promise<DataDetails> {
    const response = await fetch(`${this.baseUrl}${url}/${id}`);
    const dataById = await response.json();
    return dataById;
  }

  async getData(url: string): Promise<DataDetails[]> {
    const response = await fetch(`${this.baseUrl}${url}`);
    const data = await response.json();
    return data;
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
}

const apiRequest = new ApiRequest();

export default apiRequest;
