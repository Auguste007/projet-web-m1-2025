import { createFileRoute, Link } from '@tanstack/react-router';
import { Breadcrumb, Typography, List, Skeleton, Button, Input, Avatar, Space } from 'antd';
import { Route as authorsRoute } from '../authors';
import { useAuthorDetailsProvider } from '../../authors/providers/useAuthorDetailsProvider';
import { useEffect, useState } from 'react';
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';

export const Route = createFileRoute('/authors/$authorId')({
  component: AuthorDetailsPage,
});

function AuthorDetailsPage() {
  const { authorId } = Route.useParams();
  const { author, books, stats, isLoading, loadAuthorDetails, updateAuthor } = useAuthorDetailsProvider(authorId);

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    loadAuthorDetails();
  }, [authorId]);

  useEffect(() => {
    if (author) {
      setFirstName(author.firstName);
      setLastName(author.lastName);
    }
  }, [author]);

  const handleValidateEdit = () => {
    updateAuthor({ firstName, lastName }).then(() => {
      setIsEditing(false);
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (author) {
      setFirstName(author.firstName);
      setLastName(author.lastName);
    }
  };

  if (isLoading || !author) {
    return <Skeleton active />;
  }

  return (
    <div style={{ padding: '0 1rem' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><Link to={authorsRoute.to}>Auteurs</Link></Breadcrumb.Item>
        <Breadcrumb.Item>{author.firstName} {author.lastName}</Breadcrumb.Item>
      </Breadcrumb>

      <Space align="center" style={{ marginBottom: '1rem' }}>
        <Avatar size={64} src={author.photoUrl} />
        {isEditing ? (
          <Space>
            <Input value={firstName} onChange={e => setFirstName(e.target.value)} />
            <Input value={lastName} onChange={e => setLastName(e.target.value)} />
          </Space>
        ) : (
          <Typography.Title level={1} style={{ margin: 0 }}>{author.firstName} {author.lastName}</Typography.Title>
        )}
        
        {isEditing ? (
          <Space>
            <Button type="primary" onClick={handleValidateEdit} icon={<CheckOutlined />} />
            <Button onClick={handleCancelEdit} icon={<CloseOutlined />} />
          </Space>
        ) : (
          <Button onClick={() => setIsEditing(true)} icon={<EditOutlined />} />
        )}
      </Space>

      <Typography.Title level={4}>Statistiques</Typography.Title>
      <Typography.Text>
        Moyenne des ventes par livre : {stats?.averageSales.toFixed(2)}
      </Typography.Text>

      <Typography.Title level={3} style={{ marginTop: '2rem' }}>Livres Écrits</Typography.Title>
      <List
        dataSource={books}
        renderItem={(book) => (
          <List.Item>
            <Link to="/books/$bookId" params={{bookId: book.id}}>{book.title}</Link> ({book.yearPublished})
          </List.Item>
        )}
      />
    </div>
  );
}