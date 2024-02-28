import { Injectable } from '@nestjs/common';
// import { AxiosResponse } from 'axios';
// import { Observable } from 'rxjs';
import { PokeResponse } from './interfaces/poke-response.interface';
import { HttpService } from '@nestjs/axios';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Pokemon.name)
    private readonly pokeModel: Model<Pokemon>,
  ) {}

  // findAll(): Observable<AxiosResponse<Pokemon[]>> {
  //   return this.httpService.axiosRef.get('http://localhost:3000/pokemon');
  // }

  async executeSeed() {
    const { data } = await this.httpService.axiosRef.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0',
    );
    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const num = +segments[segments.length - 2];
      await this.pokeModel.create({ num, name });
    });
    return data.results;
  }
}
