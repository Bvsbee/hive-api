import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(1)
  @MaxLength(16)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(1)
  @MaxLength(16)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @MinLength(1)
  @MaxLength(16)
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @IsNotEmpty()
  @Matches(/^.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*$/)
  password: string;
}
