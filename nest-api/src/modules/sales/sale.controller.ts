
import { Body, Controller,Get, Param, Post  } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './sale.dto';
import type { ClientId } from '../clients/client.entity';
import type { BookId } from '../books/entities/book.entity';

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  createSale(@Body() createSaleDto: CreateSaleDto) {
    return this.saleService.createSale(createSaleDto);
  }

   @Get('client/:clientId')
  findSalesByClientId(@Param('clientId') clientId: ClientId) {
    return this.saleService.findSalesByClientId(clientId);
  }

  @Get('book/:bookId')
  findSalesByBookId(@Param('bookId') bookId: BookId) {
    return this.saleService.findSalesByBookId(bookId);
  }
}