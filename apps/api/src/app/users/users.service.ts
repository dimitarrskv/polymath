import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, InsertResult, UpdateResult } from 'typeorm';

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

  create(user: User): Promise<InsertResult> {
    return this.usersRepository.insert(user);
  }

  async save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  update(user: User) {
    return this.usersRepository.save(user);
  }
}