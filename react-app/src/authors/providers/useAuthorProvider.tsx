import { useState } from 'react';
import axios from 'axios';
import type { AuthorModel, CreateAuthorModel } from '../types/AuthorModel';

export const useAuthorProvider = () => {
  const [authors, setAuthors] = useState<AuthorModel[]>([]);

  const loadAuthors = () => {
    axios.get('http://localhost:3000/authors')
      .then(res => setAuthors(res.data))
      .catch(err => console.error('Erreur chargement auteurs:', err));
  };

  const createAuthor = (author: CreateAuthorModel) => {
    axios.post('http://localhost:3000/authors', author)
      .then(() => loadAuthors())
      .catch(err => console.error('Erreur création auteur:', err));
  };
  
  const deleteAuthor = (id: string) => {
    axios.delete(`http://localhost:3000/authors/${id}`)
      .then(() => loadAuthors())
      .catch(err => console.error('Erreur suppression auteur:', err));
  };

  return { authors, loadAuthors, createAuthor, deleteAuthor };
};