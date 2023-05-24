import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsIn,
  IsAlphanumeric,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsAlphanumeric()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['buyer', 'seller'])
  role: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
