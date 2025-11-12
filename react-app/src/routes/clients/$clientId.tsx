import { createFileRoute, Link } from '@tanstack/react-router';
import { Breadcrumb, Typography } from 'antd';
import { Route as clientsRoute } from '../clients'; 

export const Route = createFileRoute('/clients/$clientId')({
  component: ClientDetailsPage,
});

function ClientDetailsPage() {
  const { clientId } = Route.useParams();

  return (
    <div style={{ padding: '0 1rem' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to={clientsRoute.to}>Clients</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Détails du Client</Breadcrumb.Item>
      </Breadcrumb>

      <Typography.Title level={1}>Détails du Client</Typography.Title>
      <p>ID du client : {clientId}</p>
    </div>
  );
}