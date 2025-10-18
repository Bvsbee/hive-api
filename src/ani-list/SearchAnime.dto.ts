import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class SearchAnimeDto {
  @IsNotEmpty()
  @IsString()
  anime: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  page: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  perPage: number;
}
