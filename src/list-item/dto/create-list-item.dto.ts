import { IsNotEmpty, IsString } from 'class-validator';

export class CreateListItemDto {
  @IsNotEmpty()
  @IsString()
  listGuid: string;
}
