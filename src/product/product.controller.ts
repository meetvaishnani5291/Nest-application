import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/createProduct.dto';
import { InsertUser } from 'src/decorator/InsertUser.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { IsSeller } from './IsSeller.guard';

@Controller('product')
@UseGuards(AuthGuard, IsSeller)
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('create')
  async createProduct(
    @Body('product') product: CreateProductDTO,
    @InsertUser() user,
  ) {
    return await this.productService.create(product, user);
  }
  @Get()
  async getProducts(@InsertUser() user) {
    return await this.productService.getAllProducts(user);
  }
}
