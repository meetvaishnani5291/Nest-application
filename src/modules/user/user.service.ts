import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDTO } from './dto/createUser.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(user: CreateUserDTO) {
    user = this.userRepository.create(user);
    await this.userRepository.save(user);
    return user;
  }
  findByEmail(email: string) {
    return this.userRepository.findOneBy({
      email,
    });
  }
  findById(id: number) {
    return this.userRepository.findOneBy({ id });
  }
}
