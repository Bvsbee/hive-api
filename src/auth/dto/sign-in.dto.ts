import { IsString, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
  @IsString()
  @MinLength(1)
  @MaxLength(16)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}
