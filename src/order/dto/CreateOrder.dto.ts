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
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsPositive()
  quantity: number;
}

export class CreateOrderDTO {
  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  products: OrderItemDTO[];
}
