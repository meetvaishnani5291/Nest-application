import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/user/dto/createUser.dto';
import { LoginUserDTO } from 'src/user/dto/loginUser.dto';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { responseDTO } from 'src/DTOs/response.dto';
import { errorResponseDto } from 'src/exception-filters/dto/error.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authServie: AuthService) {}

  @ApiResponse({
    type: errorResponseDto,
  })
  @ApiCreatedResponse({
    type: responseDTO,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  register(@Body() user: CreateUserDTO) {
    console.log(user);
    return this.authServie.register(user);
  }

  @ApiResponse({
    type: errorResponseDto,
  })
  @ApiCreatedResponse({
    type: responseDTO,
  })
  @Post('login')
  login(@Body() user: LoginUserDTO) {
    const { email, password } = user;
    return this.authServie.login(email, password);
  }
}
