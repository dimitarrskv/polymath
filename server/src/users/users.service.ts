import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, InsertResult } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  create(email: string): Promise<InsertResult> {
    const user = new User();
    user.email = email;
    return this.usersRepository.insert(user);
  }
}