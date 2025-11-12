export type ClientModel = {
  id: string;
  nom: string;
  prenom: string;
  email?: string;
  photoUrl?: string;
};

export type CreateClientModel = Omit<ClientModel, 'id'>;

export type UpdateClientModel = Partial<CreateClientModel>;