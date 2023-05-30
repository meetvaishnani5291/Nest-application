import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { responseDTO } from 'src/DTOs/response.dto';
import { errorResponseDto } from 'src/DTOs/error.dto';
import { CreateUserDTO } from '../user/dto/createUser.dto';
import { LoginUserDTO } from '../user/dto/loginUser.dto';
import { Public } from 'src/decorators/publicRoutes.decorator';

@ApiTags('auth')
@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    type: errorResponseDto,
  })
  @ApiCreatedResponse({
    type: responseDTO,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() newUser: CreateUserDTO) {
    const user = await this.authService.register(newUser);
    return { user };
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
    return this.authService.login(email, password);
  }
}
