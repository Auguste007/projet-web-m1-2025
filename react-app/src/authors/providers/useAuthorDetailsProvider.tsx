import { useState } from 'react';
import axios from 'axios';
import type { AuthorModel, UpdateAuthorModel } from '../types/AuthorModel';
import type { BookModel } from '../../books/BookModel';

export const useAuthorDetailsProvider = (authorId: string) => {
  const [author, setAuthor] = useState<AuthorModel | null>(null);
  const [books, setBooks] = useState<BookModel[]>([]);
  const [stats, setStats] = useState<{ averageSales: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadAuthorDetails = () => {
    setIsLoading(true);
    Promise.all([
      axios.get(`http://localhost:3000/authors/${authorId}`),
      axios.get(`http://localhost:3000/books/author/${authorId}`),
      axios.get(`http://localhost:3000/authors/${authorId}/stats`),
    ])
      .then(([authorResponse, booksResponse, statsResponse]) => {
        setAuthor(authorResponse.data);
        setBooks(booksResponse.data);
        setStats(statsResponse.data);
      })
      .catch(err => console.error("Erreur chargement détails auteur:", err))
      .finally(() => setIsLoading(false));
  };

  const updateAuthor = (updateData: UpdateAuthorModel) => {
    return axios
      .patch(`http://localhost:3000/authors/${authorId}`, updateData)
      .then(() => {
       
        loadAuthorDetails();
      })
      .catch(err => {
        console.error("Erreur lors de la mise à jour de l'auteur:", err);
        
        throw err;
      });
  };

  return { author, books, stats, isLoading, loadAuthorDetails, updateAuthor };
};