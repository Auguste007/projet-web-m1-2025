import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity, ClientId } from './client.entity';
import { CreateClientModel, UpdateClientModel } from './client.model';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  public async getAllClients(): Promise<ClientEntity[]> {
    return this.clientRepository.find();
  }

  public async getClientById(id: ClientId): Promise<ClientEntity | null> {
    return this.clientRepository.findOne({ where: { id } });
  }

  public async createClient(client: CreateClientModel): Promise<ClientEntity> {
    const newClient = this.clientRepository.create(client);
    return this.clientRepository.save(newClient);
  }

  public async updateClient(id: ClientId, client: UpdateClientModel): Promise<void> {
    await this.clientRepository.update(id, client);
  }

  public async deleteClient(id: ClientId): Promise<void> {
    await this.clientRepository.delete(id);
  }
}