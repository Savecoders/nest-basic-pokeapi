import { Injectable } from '@nestjs/common';
// import { AxiosResponse } from 'axios';
// import { Observable } from 'rxjs';
import { PokeResponse } from './interfaces/poke-response.interface';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SeedService {
  constructor(private readonly httpService: HttpService) {}

  // findAll(): Observable<AxiosResponse<Pokemon[]>> {
  //   return this.httpService.axiosRef.get('http://localhost:3000/pokemon');
  // }

  async executeSeed() {
    const { data } = await this.httpService.axiosRef.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon',
    );
    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const num = +segments[segments.length - 2];
    });
    return data.results;
  }
}
