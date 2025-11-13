import { useState } from 'react';
import axios from 'axios';
import type { ClientModel } from '../types/ClientModel';

type Sale = {
  id: string;
  dateAchat: string;
  book: {
    id: string;
    title: string;
    author: {
      firstName: string;
      lastName: string;
    };
  };
};

export const useClientDetailsProvider = (clientId: string) => {
  const [client, setClient] = useState<ClientModel | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadClientDetails = () => {
    setIsLoading(true);

    Promise.all([
      axios.get(`http://localhost:3000/clients/${clientId}`),
      axios.get(`http://localhost:3000/sales/client/${clientId}`),
    ])
      .then(([clientResponse, salesResponse]) => {
        setClient(clientResponse.data);
        setSales(salesResponse.data);
      })
      .catch(err => console.error('Erreur chargement détails client:', err))
      .finally(() => setIsLoading(false));
  };

  return { client, sales, isLoading, loadClientDetails };
};