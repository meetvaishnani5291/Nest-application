import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/createProduct.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { IsSeller } from './IsSeller.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { responseDTO } from 'src/DTOs/response.dto';
import { errorResponseDto } from 'src/DTOs/error.dto';
import { InsertUser } from 'src/decorators/InsertUser.decorator';
import { Product } from '../../entities/product.entity';
import { User } from '../../entities/user.entity';

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
    return { product };
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
    return { products };
  }
}
