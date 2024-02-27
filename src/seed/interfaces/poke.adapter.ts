import axios from 'axios';

export interface HttpAdapter {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, payload: any): Promise<T>;
  patch<T>(url: string, payload: any): Promise<T>;
  delete(url: string): Promise<void>;
}

export class PokeApiFetcherAdapter implements HttpAdapter {
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

export class PokeApiAdapter implements HttpAdapter {
  private readonly httpClient = axios;

  async get<T>(url: string): Promise<T> {
    const { data } = await this.httpClient.get<T>(url);
    return data;
  }
  async post<T>(url: string, payload: any) {
    const { data } = await this.httpClient.post<T>(url, payload);
    return data;
  }

  async patch<T>(url: string, payload: any) {
    const { data } = await this.httpClient.patch<T>(url, payload);
    return data;
  }

  async delete(url: string): Promise<void> {
    return await this.httpClient.delete(url);
  }
}
