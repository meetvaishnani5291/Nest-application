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

export class OrderItemDTO {
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsPositive()
  quantity: number;
}

export class CreateOrderDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  products: OrderItemDTO[];
}
