import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import  { ClientEntity } from '../clients/client.entity';
import  { BookEntity } from '../books/entities/book.entity';
import type { ClientId } from '../clients/client.entity';
import type { BookId } from '../books/entities/book.entity';

export type SaleId = string & { __brand: 'Sale' };

@Entity('sales')
export class SaleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: SaleId;

 
  @Column({ name: 'date_achat', type: 'datetime' })
  dateAchat: Date;

  

  
  @Column({ name: 'client_id', type: 'uuid' })
  clientId: ClientId;

 
  @Column({ name: 'book_id', type: 'uuid' })
  bookId: BookId;

  
  @ManyToOne(() => ClientEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' }) 
  client: ClientEntity;

  
  @ManyToOne(() => BookEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' }) 
  book: BookEntity;
}