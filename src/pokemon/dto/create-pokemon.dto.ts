import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {
  @IsInt()
  @IsPositive()
  @Min(1)
  readonly num: number;

  @IsString()
  @MinLength(1)
  name: string;
}
