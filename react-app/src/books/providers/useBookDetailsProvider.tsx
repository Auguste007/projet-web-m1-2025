import { useState } from 'react';
import axios from 'axios';
import type { BookModel } from '../BookModel';

type Sale = {
  id: string;
  dateAchat: string;
  client: {
    id: string;
    nom: string;
    prenom: string;
    photoUrl?: string;
  };
};

export const useBookDetailsProvider = (bookId: string) => {
  const [book, setBook] = useState<BookModel | null>(null);
  const [sales, setSales] = useState<Sale[]>([]); 
  const [isLoading, setIsLoading] = useState(true);

  const loadBookDetails = () => {
    setIsLoading(true);
    Promise.all([
      axios.get(`http://localhost:3000/books/${bookId}`),
      axios.get(`http://localhost:3000/sales/book/${bookId}`), 
    ])
      .then(([bookResponse, salesResponse]) => {
        setBook(bookResponse.data);
        setSales(salesResponse.data); 
      })
      .catch(err => console.error("Erreur chargement détails livre:", err))
      .finally(() => setIsLoading(false));
  };

  return { book, sales, isLoading, loadBookDetails }; 
};