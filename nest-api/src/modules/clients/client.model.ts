import { ClientId } from './client.entity';

export type ClientModel = {
  id: ClientId;
  nom: string;
  prenom: string;
  email?: string;
  photoUrl?: string;
};

export type CreateClientModel = {
  nom: string;
  prenom: string;
  email?: string;
  photoUrl?: string;
};

export type UpdateClientModel = Partial<CreateClientModel>;