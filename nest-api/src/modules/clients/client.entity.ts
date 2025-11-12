import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SaleEntity } from '../sales/sale.entity';

export type ClientId = string & { __brand: 'Client' };

@Entity('clients')
export class ClientEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: ClientId;

  @Column({ name: 'nom', type: 'varchar' })
  nom: string;

  @Column({ name: 'prenom', type: 'varchar' })
  prenom: string;

  @Column({ name: 'email', type: 'varchar', nullable: true })
  email: string;

  @Column({ name: 'photo_url', type: 'varchar', nullable: true })
  photoUrl: string;

  @OneToMany(() => SaleEntity, (sale) => sale.client)
  sales: SaleEntity[];
}