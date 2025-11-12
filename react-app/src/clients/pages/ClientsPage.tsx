import { Typography, List } from 'antd';
import { useClientProvider } from '../providers/useClientProvider';
import { useEffect } from 'react';
import { CreateClientModal } from '../components/CreateClientModal';
import { ClientListItem } from '../components/ClientListItem';

export function ClientsPage() {
  const { clients, loadClients, createClient, deleteClient } = useClientProvider();

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
          <ClientListItem client={client} onDelete={deleteClient} />
        )}
      />
    </div>
  );
}