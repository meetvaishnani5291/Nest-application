import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsIn,
  MinLength,
  IsAlphanumeric,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class CreateUserDTO {
  @ApiProperty({
    type: String,
    description: 'name of user',
    example: 'meet vaishnani',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: 'email of user',
    example: 'user@gmail.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'password of user',
    example: 'xyz@123',
  })
  @MinLength(6)
  @IsString()
  password: string;

  @ApiProperty({ enum: ['buyer', 'seller'] })
  @IsString()
  @IsNotEmpty()
  @IsIn(['buyer', 'seller'])
  role: string;

  @ApiProperty({
    type: String,
    description: 'address of user',
    example: 'gujrat india',
  })
  @IsString()
  @IsNotEmpty()
  address: string;
}
