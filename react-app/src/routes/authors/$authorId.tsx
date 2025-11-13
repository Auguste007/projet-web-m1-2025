import { createFileRoute, Link } from '@tanstack/react-router';
import { Breadcrumb, Typography, List, Skeleton, Avatar } from 'antd';
import { Route as authorsRoute } from '../authors';
import { useAuthorDetailsProvider } from '../../authors/providers/useAuthorDetailsProvider';
import { useEffect } from 'react';

export const Route = createFileRoute('/authors/$authorId')({
  component: AuthorDetailsPage,
});

function AuthorDetailsPage() {
  const { authorId } = Route.useParams();
  const { author, books, isLoading, loadAuthorDetails } = useAuthorDetailsProvider(authorId);

  useEffect(() => {
    loadAuthorDetails();
  }, [authorId]);

  if (isLoading || !author) {
    return <Skeleton active />;
  }

  return (
    <div style={{ padding: '0 1rem' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><Link to={authorsRoute.to}>Auteurs</Link></Breadcrumb.Item>
        <Breadcrumb.Item>{author.firstName} {author.lastName}</Breadcrumb.Item>
      </Breadcrumb>
      <Avatar size={64} src={author.photoUrl} />
      <Typography.Title level={1}>{author.firstName} {author.lastName}</Typography.Title>
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