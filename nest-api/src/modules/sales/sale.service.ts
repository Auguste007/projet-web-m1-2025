import { Injectable } from '@nestjs/common';
import { SaleRepository } from './sale.repository';
import { CreateSaleModel } from './sale.model';
import { SaleEntity } from './sale.entity';
import { ClientId } from '../clients/client.entity';
import { BookId } from '../books/entities/book.entity';

@Injectable()
export class SaleService {
  constructor(private readonly saleRepository: SaleRepository) {}

  public createSale(sale: CreateSaleModel): Promise<SaleEntity> {
    
    return this.saleRepository.createSale(sale);
  }
  public findSalesByClientId(clientId: ClientId): Promise<SaleEntity[]> {
    return this.saleRepository.findSalesByClientId(clientId);
  }
  public findSalesByBookId(bookId: BookId): Promise<SaleEntity[]> {
    return this.saleRepository.findSalesByBookId(bookId);
  }
}