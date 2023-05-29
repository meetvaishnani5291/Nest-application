import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateUserDTO } from '../user/dto/createUser.dto';
import { User } from '../user/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(newProduct: Product, user: User) {
    newProduct = this.productRepository.create(newProduct);
    newProduct.seller = user;
    return await this.productRepository.save<Product>(newProduct);
  }
  async save(product: Product) {
    return await this.productRepository.save(product);
  }
  async getAllProducts(user: CreateUserDTO) {
    return await this.productRepository.findBy({ seller: user });
  }
  async findOneById(id: number) {
    return await this.productRepository.findOneBy({
      id,
    });
  }
}
