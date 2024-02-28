import { Injectable } from '@nestjs/common';
import { HttpAdapter } from '../iinterfaces/http-adapter.interface';

@Injectable()
export class FetcherAdapter implements HttpAdapter {
  async get<T>(url: string): Promise<T> {
    const res = await fetch(url);
    const data = await res.json();
    return data as T;
  }

  async post<T>(url: string, payload: any): Promise<T> {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data as T;
  }

  async patch<T>(url: string, payload: any): Promise<T> {
    const res = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data as T;
  }

  async delete(url: string): Promise<void> {
    await fetch(url, {
      method: 'DELETE',
    });
  }
}
