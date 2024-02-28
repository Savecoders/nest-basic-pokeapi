import axios from 'axios';
import { HttpAdapter } from '../iinterfaces/http-adapter.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private readonly httpClient = axios;

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.httpClient.get<T>(url);
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  async post<T>(url: string, payload: any) {
    try {
      const { data } = await this.httpClient.post<T>(url, payload);
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  async patch<T>(url: string, payload: any) {
    try {
      const { data } = await this.httpClient.patch<T>(url, payload);
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  async delete(url: string): Promise<void> {
    return await this.httpClient.delete(url);
  }
}
