import { createFileRoute } from '@tanstack/react-router';
import { Typography } from 'antd';

export const Route = createFileRoute('/clients/$clientId')({
  component: ClientDetailsPage,
});

function ClientDetailsPage() {
  const { clientId } = Route.useParams();

  return (
    <div style={{ padding: '0 1rem' }}>
      <Typography.Title level={1}>Détails du Client</Typography.Title>
      <p>ID du client : {clientId}</p>
    </div>
  );
}