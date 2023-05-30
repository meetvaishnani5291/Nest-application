import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
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
import { User } from '../../entities/user.entity';

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
  async placeOrder(@Body() newOrder: CreateOrderDTO, @InsertUser() user: User) {
    const order = await this.orderService.createOrder(newOrder.products, user);
    return { order };
  }

  @ApiResponse({
    type: errorResponseDto,
  })
  @ApiCreatedResponse({
    type: responseDTO,
  })
  @Get()
  async getOrders(@InsertUser() user: User) {
    const orders = await this.orderService.getOrders(user);
    return { orders };
  }
}
