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
      if (error.code === 11000) {
        // error 11000 is a duplicate key error in MongoDB
        throw new BadRequestException(
          `Pokemon already exists ${JSON.stringify(error.keyValue)}`,
        );
      }
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async findAll(): Promise<Pokemon[]> {
    return this.pokeModel.find().exec();
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

  update(id: string, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: string) {
    return `This action removes a #${id} pokemon`;
  }
}
