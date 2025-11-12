import type { ClientId } from '../clients/client.entity';
import type { BookId } from '../books/entities/book.entity';

export type CreateSaleModel = {
  clientId: ClientId;
  bookId: BookId;
  dateAchat: Date;
};