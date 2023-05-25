import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateProductDTO {
  @ApiProperty({
    type: String,
    description: 'name of product',
    example: 'Iphone 13',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    description: 'quantity of product',
    example: 10,
  })
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiProperty({
    type: Number,
    description: 'price of product',
    example: 100000,
  })
  @IsNumber()
  @IsPositive()
  price: number;
}
