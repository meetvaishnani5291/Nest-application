import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { responseDTO } from 'src/DTOs/response.dto';
import { errorResponseDto } from 'src/DTOs/error.dto';
import { CreateUserDTO } from '../user/dto/createUser.dto';
import { LoginUserDTO } from '../user/dto/loginUser.dto';
import { Public } from 'src/decorators/publicRoutes.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('auth')
@Public()
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
