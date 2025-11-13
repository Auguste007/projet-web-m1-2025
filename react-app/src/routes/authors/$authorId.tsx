import { createFileRoute, Link } from '@tanstack/react-router';
import { Breadcrumb, Typography } from 'antd';
import { Route as authorsRoute } from '../authors';

export const Route = createFileRoute('/authors/$authorId')({
  component: AuthorDetailsPage,
});

function AuthorDetailsPage() {
  const { authorId } = Route.useParams();

  return (
    <div style={{ padding: '0 1rem' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to={authorsRoute.to}>Auteurs</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Détails de l'auteur</Breadcrumb.Item>
      </Breadcrumb>

      <Typography.Title level={1}>Détails de l'Auteur</Typography.Title>
      <p>ID de l'auteur : {authorId}</p>
    </div>
  );
}