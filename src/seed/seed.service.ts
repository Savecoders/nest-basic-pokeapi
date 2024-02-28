import { Injectable } from '@nestjs/common';
// import { AxiosResponse } from 'axios';
// import { Observable } from 'rxjs';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    private readonly http: AxiosAdapter,
    @InjectModel(Pokemon.name)
    private readonly pokeModel: Model<Pokemon>,
  ) {}

  // findAll(): Observable<AxiosResponse<Pokemon[]>> {
  //   return this.httpService.axiosRef.get('http://localhost:3000/pokemon');
  // }

  async executeSeed() {
    await this.pokeModel.deleteMany({}).exec(); // delete all documents

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650&offset=0',
    );

    const pokemonToInsert: { name: string; num: number }[] = data.results.map(
      ({ name, url }) => {
        const segments = url.split('/');
        const num = +segments[segments.length - 2];
        return { name, num };
      },
    );

    // insertMany is faster than insertOne
    await this.pokeModel.insertMany(pokemonToInsert);
    return data.results;
  }
}
