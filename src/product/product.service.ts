import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(newProduct, user) {
    newProduct = this.productRepository.create(newProduct);
    newProduct.seller = user;
    return await this.productRepository.save(newProduct);
  }
  async getAllProducts(user) {
    return await this.productRepository.findBy({ seller: user });
  }
  async findOneById(id: number) {
    return await this.productRepository.findOneBy({
      id,
    });
  }
}
