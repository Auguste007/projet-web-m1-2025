import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from './sale.entity';
import { SaleController } from './sale.controller';
import { SaleRepository } from './sale.repository';
import { SaleService } from './sale.service';

@Module({
  imports: [TypeOrmModule.forFeature([SaleEntity])],
  controllers: [SaleController],
  providers: [SaleRepository, SaleService],
  exports: [SaleRepository, SaleService],
})
export class SaleModule {}