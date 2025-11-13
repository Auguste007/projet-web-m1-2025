import { Avatar, Button, List, Popconfirm, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { AuthorModel } from '../types/AuthorModel';
import { Link } from '@tanstack/react-router';

interface AuthorListItemProps {
  author: AuthorModel;
  onDelete: (id: string) => void;
}

export function AuthorListItem({ author, onDelete }: AuthorListItemProps) {
  return (
    <List.Item
      actions={[
        <Popconfirm title="Supprimer l'auteur ?" onConfirm={() => onDelete(author.id)} okText="Oui" cancelText="Non">
          <Button type="primary" danger icon={<DeleteOutlined />} />
        </Popconfirm>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={author.photoUrl} />}
        title={<Link to="/authors/$authorId" params={{ authorId: author.id }}>{author.firstName} {author.lastName}</Link>}
        description={`${author.booksWritten} livre(s) écrit(s)`}
      />
    </List.Item>
  );
}