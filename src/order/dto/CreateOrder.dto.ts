import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  Min,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class OrderItemDTO {
  @ApiProperty({
    type: Number,
    description: 'productId of product',
    example: 11,
  })
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({
    type: Number,
    description: 'quantity of product',
    example: 1001,
  })
  @IsNumber()
  @IsPositive()
  quantity: number;
}

export class CreateOrderDTO {
  @ApiProperty({ type: [OrderItemDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  products: OrderItemDTO[];
}
