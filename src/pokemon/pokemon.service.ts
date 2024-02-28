import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  // implement the constructor to inject the Pokemon model
  // Solid Principle: Dependency Inversion
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokeModel: Model<Pokemon>,
  ) {}
  // implement the create() method to create a new Pokemon
  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    try {
      createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
      const pokemon = await this.pokeModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleException(error);
    }
  }

  // implement query parameters with limit, skip, and sort
  async findAll(): Promise<Pokemon[]> {
    return this.pokeModel.find().limit(10).exec();
  }

  async findOne(term: string): Promise<Pokemon> {
    let pokemon: Pokemon;

    if (!isNaN(+term)) {
      pokemon = await this.pokeModel.findOne({ num: term }).exec();
    }

    // MongoID
    // isValidObjectId() checks if the term is
    // a valid MongoDB ObjectId
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokeModel.findById(term).exec();
    }

    // Name
    if (!pokemon) {
      pokemon = await this.pokeModel
        .findOne({ name: term.toLocaleLowerCase().trim() })
        .exec();
    }
    // catch if the pokemon is not found
    if (!pokemon) {
      throw new NotFoundException(
        `Pokemon not found ${term} with id or name or num`,
      );
    }

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    try {
      if (updatePokemonDto.name) {
        updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
      }
      await this.pokeModel.updateOne({ name: pokemon.name }, updatePokemonDto);
      return {
        ...pokemon.toJSON(),
        ...updatePokemonDto,
      };
    } catch (error) {
      this.handleException(error);
    }
  }
  async remove(id: string): Promise<any> {
    // const pokemon = await this.findOne(id);
    // return
    // {
    //   "acknowledged": true,
    //   "deletedCount": 0
    // }
    const { acknowledged, deletedCount } = await this.pokeModel
      .deleteOne({ _id: id })
      .exec();

    if (!acknowledged || deletedCount === 0) {
      throw new BadRequestException(`Pokemon not found ${id}`);
    }
    return;
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon already exists ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException('Internal Server Error');
  }
}
