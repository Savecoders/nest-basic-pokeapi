import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from 'src/pokemon/entities/pokemon.entity';
import { CommonModule } from 'src/common/common.module';
// import { PokemonService } from 'src/pokemon/pokemon.service';
// import { PokemonModule } from '../pokemon/pokemon.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema,
      },
    ]),
    HttpModule,
    CommonModule,
  ],
})
export class SeedModule {}
