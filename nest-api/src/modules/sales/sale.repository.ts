import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleEntity } from './sale.entity';
import { CreateSaleModel } from './sale.model';

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
}