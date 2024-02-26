import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// Document is a type provided by Mongoose
// that represents a single document in the database.

export type PokemonDocument = HydratedDocument<Pokemon>;

@Schema()
export class Pokemon {
  //! ID: not create id because it will be created by MongoDB
  // @Prop() is a decorator provided by Mongoose
  // that allows you to define the schema of a field.
  //* is "bussiness logic" of the entity
  @Prop({
    unique: true,
    index: true,
  })
  num: number;
  @Prop({
    unique: true,
    index: true,
  })
  name: string;
}
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
