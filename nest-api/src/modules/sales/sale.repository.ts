import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { SaleEntity } from './sale.entity';
import { CreateSaleModel } from './sale.model';
import { ClientId } from '../clients/client.entity';
import { BookId } from '../books/entities/book.entity';


@Injectable()
export class SaleRepository {
  constructor(
    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<SaleEntity>,
  ) {}

  public async createSale(sale: CreateSaleModel): Promise<SaleEntity> {
    const newSale = this.saleRepository.create(sale);
    return this.saleRepository.save(newSale);
  }

  public async findSalesByClientId(clientId: ClientId): Promise<SaleEntity[]> {
    return this.saleRepository.find({
      where: { clientId },
      relations: ['book', 'book.author'], // Pour charger aussi les infos du livre et de son auteur
    });
  }

  public async findSalesByBookId(bookId: BookId): Promise<SaleEntity[]> {
    return this.saleRepository.find({
      where: { bookId },
      relations: ['client'], // Pour charger les infos du client
    });
  }

  public async countSalesByBookIds(bookIds: BookId[]): Promise<number> {
    if (bookIds.length === 0) {
      return 0;
    }
    return this.saleRepository.count({ where: { bookId: In(bookIds) } });
  }
}