import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOrderDTO } from './dto/CreateOrder.dto';
import { errorResponseDto } from 'src/DTOs/error.dto';
import { responseDTO } from 'src/DTOs/response.dto';
import { InsertUser } from 'src/decorators/InsertUser.decorator';
import { User } from '../user/user.entity';

@ApiTags('order')
@ApiBearerAuth('Authorization')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiResponse({
    type: errorResponseDto,
  })
  @ApiCreatedResponse({
    type: responseDTO,
  })
  @Post('placeOrder')
  async placeOrder(@Body() order: CreateOrderDTO, @InsertUser() user: User) {
    return await this.orderService.createOrder(order.products, user);
  }
}
