import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDTO {
  @ApiProperty({
    type: String,
    description: 'email of user',
    example: 'user@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    description: 'password of user',
    example: 'xyz@123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
