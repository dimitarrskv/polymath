import { Module } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instagram } from './instagram.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Instagram])],
  providers: [InstagramService],
  exports: [InstagramService, TypeOrmModule],
})
export class InstagramModule {}