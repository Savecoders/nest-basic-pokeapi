import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { HttpModule } from '@nestjs/axios';
// import { PokemonService } from 'src/pokemon/pokemon.service';
// import { PokemonService } from 'src/pokemon/pokemon.service';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [HttpModule],
})
export class SeedModule {}
