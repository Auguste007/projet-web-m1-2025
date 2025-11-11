import { Injectable } from '@nestjs/common';
import { ClientRepository } from './client.repository';
import { CreateClientModel, UpdateClientModel } from './client.model';
import { ClientEntity, ClientId } from './client.entity';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  public getAllClients(): Promise<ClientEntity[]> {
    return this.clientRepository.getAllClients();
  }

  public getClientById(id: ClientId): Promise<ClientEntity | null> {
    return this.clientRepository.getClientById(id);
  }

  public createClient(client: CreateClientModel): Promise<ClientEntity> {
    return this.clientRepository.createClient(client);
  }

  public async updateClient(
    id: ClientId,
    client: UpdateClientModel,
  ): Promise<void> {
    await this.clientRepository.updateClient(id, client);
  }

  public async deleteClient(id: ClientId): Promise<void> {
    await this.clientRepository.deleteClient(id);
  }
}