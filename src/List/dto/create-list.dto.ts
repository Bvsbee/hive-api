import { ListItem, MediaType } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateListDto {
  @IsNotEmpty()
  @IsString()
  userGuid: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  icon: string;

  @IsNotEmpty()
  mediaTypes: MediaType[];
}
