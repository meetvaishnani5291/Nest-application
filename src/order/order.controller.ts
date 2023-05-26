import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { InsertUser } from 'src/decorator/InsertUser.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { responseDTO } from '../DTOs/response.dto';
import { errorResponseDto } from 'src/exception-filters/dto/error.dto';
import { CreateOrderDTO } from './dto/CreateOrder.dto';

@ApiTags('order')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard)
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
  async placeOrder(@Body() order: CreateOrderDTO, @InsertUser() user) {
    return await this.orderService.createOrder(order.products, user);
  }
}
