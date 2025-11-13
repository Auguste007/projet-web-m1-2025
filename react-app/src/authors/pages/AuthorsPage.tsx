import { Typography, List } from 'antd';
import { useAuthorProvider } from '../providers/useAuthorProvider';
import { useEffect } from 'react';
import { CreateAuthorModal } from '../components/CreateAuthorModal';
import { AuthorListItem } from '../components/AuthorListItem';

export function AuthorsPage() {
  const { authors, loadAuthors, createAuthor, deleteAuthor } = useAuthorProvider();

  useEffect(() => {
    loadAuthors();
  }, []);

  return (
    <div style={{ padding: '0 1rem' }}>
      <Typography.Title level={1}>Liste des Auteurs</Typography.Title>
      
      <CreateAuthorModal onCreate={createAuthor} />

      <List
        style={{ marginTop: '1rem' }}
        bordered
        dataSource={authors}
        renderItem={author => (
          <AuthorListItem author={author} onDelete={deleteAuthor} />
        )}
      />
    </div>
  );
}