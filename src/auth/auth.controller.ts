import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/user/dto/createUser.dto';
import { LoginUserDTO } from 'src/user/dto/loginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServie: AuthService) {}
  @Post('register')
  register(@Body('user') user: CreateUserDTO) {
    return this.authServie.register(user);
  }

  @Post('login')
  login(@Body() user: LoginUserDTO) {
    const { email, password } = user;
    return this.authServie.login(email, password);
  }
}
