import { createFileRoute, Link } from '@tanstack/react-router';
import { Breadcrumb, Typography, List, Skeleton, Avatar } from 'antd';
import { Route as clientsRoute } from '../clients';
import { useClientDetailsProvider } from '../../clients/providers/useClientDetailsProvider';
import { useEffect } from 'react';
import { BookOutlined } from '@ant-design/icons';

export const Route = createFileRoute('/clients/$clientId')({
  component: ClientDetailsPage,
});

function ClientDetailsPage() {
  const { clientId } = Route.useParams();
  const { client, sales, isLoading, loadClientDetails } = useClientDetailsProvider(clientId);

  useEffect(() => {
    loadClientDetails();
  }, [clientId]);

  if (isLoading || !client) {
    return <Skeleton active />;
  }

  return (
    <div style={{ padding: '0 1rem' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to={clientsRoute.to}>Clients</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{client.prenom} {client.nom}</Breadcrumb.Item>
      </Breadcrumb>
      <Avatar size={64} src={client.photoUrl} style={{ marginBottom: '1rem' }} />
      <Typography.Title level={1}>{client.prenom} {client.nom}</Typography.Title>
      <Typography.Text type="secondary">{client.email}</Typography.Text>
      <Typography.Title level={3} style={{ marginTop: '2rem' }}>Livres Achetés</Typography.Title>
      <List
        itemLayout="horizontal"
        dataSource={sales}
        renderItem={(sale) => (
          <List.Item>
            <List.Item.Meta
              avatar={<BookOutlined />}
              title={<Link to="/books/$bookId" params={{bookId: sale.book.id}}>{sale.book.title}</Link>}
              description={`Par ${sale.book.author.firstName} ${sale.book.author.lastName} - Acheté le ${new Date(sale.dateAchat).toLocaleDateString()}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
}