import { useState } from 'react';
import axios from 'axios';
import type { ClientModel } from '../types/ClientModel';

export const useClientProvider = () => {
  const [clients, setClients] = useState<ClientModel[]>([]);

  const loadClients = () => {
    axios
      .get('http://localhost:3000/clients')
      .then(response => {
        setClients(response.data);
      })
      .catch(err => {
        console.error('Erreur lors du chargement des clients:', err);
      });
  };

  return { clients, loadClients };
};