import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorController } from './author.controller';
import { AuthorEntity } from './author.entity';
import { AuthorRepository } from './author.repository';
import { AuthorService } from './author.service';
import { BookModule } from '../books/book.module'; 
import { SaleModule } from '../sales/sale.module'; 


@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity]), BookModule, SaleModule],
  controllers: [AuthorController],
  providers: [AuthorRepository, AuthorService],
})
export class AuthorModule {}
