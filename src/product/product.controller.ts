import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/createProduct.dto';
import { InsertUser } from 'src/decorator/InsertUser.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { IsSeller } from './IsSeller.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { errorResponseDto } from 'src/exception-filters/dto/error.dto';
import { responseDTO } from 'src/DTOs/response.dto';

@ApiTags('product')
@ApiBearerAuth('Authorization')
@Controller('product')
@UseGuards(AuthGuard, IsSeller)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiResponse({
    type: errorResponseDto,
  })
  @ApiCreatedResponse({
    type: responseDTO,
  })
  @Post('create')
  async createProduct(@Body() product: CreateProductDTO, @InsertUser() user) {
    return await this.productService.create(product, user);
  }

  @ApiResponse({
    type: errorResponseDto,
  })
  @ApiCreatedResponse({
    type: responseDTO,
  })
  @Get()
  async getProducts(@InsertUser() user) {
    return await this.productService.getAllProducts(user);
  }
}
