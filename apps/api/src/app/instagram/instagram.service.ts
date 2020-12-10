import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';
import { Instagram } from './instagram.entity';

@Injectable()
export class InstagramService {

  constructor(
    @InjectRepository(Instagram)
    private instagramRepository: Repository<Instagram>,
  ) {}

  findAll(): Promise<Instagram[]> {
    return this.instagramRepository.find();
  }

  findOne(id: string): Promise<Instagram> {
    return this.instagramRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.instagramRepository.delete(id);
  }

  async create(instagram: Instagram): Promise<InsertResult> {
    return this.instagramRepository.insert(instagram);
  }

  async save(instagram: Instagram): Promise<Instagram> {
    return this.instagramRepository.save(instagram);
  }

  update(instagram: Instagram) {
    return this.instagramRepository.save(instagram);
  }
}