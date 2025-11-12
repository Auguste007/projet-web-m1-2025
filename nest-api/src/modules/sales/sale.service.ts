import { Injectable } from '@nestjs/common';
import { SaleRepository } from './sale.repository';
import { CreateSaleModel } from './sale.model';
import { SaleEntity } from './sale.entity';

@Injectable()
export class SaleService {
  constructor(private readonly saleRepository: SaleRepository) {}

  public createSale(sale: CreateSaleModel): Promise<SaleEntity> {
    
    return this.saleRepository.createSale(sale);
  }
}