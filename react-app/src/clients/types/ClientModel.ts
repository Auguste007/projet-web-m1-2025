export type ClientModel = {
  id: string;
  nom: string;
  prenom: string;
  email?: string;
  photoUrl?: string;
  booksBought: number;
};

export type CreateClientModel = {
  nom: string;
  prenom: string;
  email?: string;
  photoUrl?: string;
};

export type UpdateClientModel = Partial<CreateClientModel>;