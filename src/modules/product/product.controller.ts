import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/createProduct.dto';
import { IsSeller } from '../../guards/IsSeller.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Product } from '../../entities/product.entity';
import { User } from '../../entities/user.entity';
import { errorResponseDto } from '../../DTOs/error.dto';
import { responseDTO } from '../../DTOs/response.dto';
import { InsertUser } from '../../decorators/InsertUser.decorator';

@ApiTags('product')
@ApiBearerAuth('Authorization')
@Controller('product')
@UseGuards(IsSeller)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiResponse({
    type: errorResponseDto,
  })
  @ApiCreatedResponse({
    type: responseDTO,
  })
  @Post('create')
  async createProduct(
    @Body() newProduct: CreateProductDTO,
    @InsertUser() user: User,
  ) {
    const product = await this.productService.create(
      newProduct as Product,
      user,
    );
    return product;
  }

  @ApiResponse({
    type: errorResponseDto,
  })
  @ApiCreatedResponse({
    type: responseDTO,
  })
  @Get()
  async getProducts(@InsertUser() user: User) {
    const products = await this.productService.getAllProducts(user);
    return products;
  }
}
