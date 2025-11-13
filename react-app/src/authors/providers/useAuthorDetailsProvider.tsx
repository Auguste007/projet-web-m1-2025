import { useState } from 'react';
import axios from 'axios';
import type { AuthorModel } from '../types/AuthorModel';
import type { BookModel } from '../../books/BookModel';

export const useAuthorDetailsProvider = (authorId: string) => {
  const [author, setAuthor] = useState<AuthorModel | null>(null);
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAuthorDetails = () => {
    setIsLoading(true);
    Promise.all([
      axios.get(`http://localhost:3000/authors/${authorId}`),
      axios.get(`http://localhost:3000/books/author/${authorId}`),
    ])
      .then(([authorResponse, booksResponse]) => {
        setAuthor(authorResponse.data);
        setBooks(booksResponse.data);
      })
      .catch(err => console.error("Erreur chargement détails auteur:", err))
      .finally(() => setIsLoading(false));
  };

  return { author, books, isLoading, loadAuthorDetails };
};