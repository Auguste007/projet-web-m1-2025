import { Typography, List } from 'antd';
import { useClientProvider } from '../providers/useClientProvider';
import { useEffect } from 'react';
import { CreateClientModal } from '../components/CreateClientModal';

export function ClientsPage() {
  const { clients, loadClients, createClient } = useClientProvider();

  useEffect(() => {
    loadClients();
  }, []);

  return (
    <div style={{ padding: '0 1rem' }}>
      <Typography.Title level={1}>Liste des Clients</Typography.Title>
      
      <CreateClientModal onCreate={createClient} />

      <List
        bordered
        dataSource={clients}
        renderItem={client => (
          <List.Item>
            <Typography.Text strong>{client.prenom} {client.nom}</Typography.Text>
            {client.email && ` - ${client.email}`}
          </List.Item>
        )}
      />
    </div>
  );
}