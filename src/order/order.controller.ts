import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateOrderDTO } from './dto/CreateOrder.dto';
import { OrderService } from './order.service';
import { InsertUser } from 'src/decorator/InsertUser.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post('placeOrder')
  placeOrder(@Body() order: CreateOrderDTO, @InsertUser() user) {
    return this.orderService.createOrder(order.products, user);
  }
}
