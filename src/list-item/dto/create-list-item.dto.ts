import {
  AnimeDetails,
  BookDetails,
  Media,
  MediaType,
  MovieDetails,
  TvDetails,
} from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateListItemDto {
  @IsNotEmpty()
  @IsString()
  listGuid: string;

  @IsNotEmpty()
  mediaType: Media;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  bookDetails: BookDetails;

  @IsOptional()
  animeDetails: AnimeDetails;

  @IsOptional()
  tvDetails: TvDetails;

  @IsOptional()
  movieDetails: MovieDetails;
}
