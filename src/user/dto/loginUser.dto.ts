import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDTO {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
