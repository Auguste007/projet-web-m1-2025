import { Button, List, Popconfirm, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { ClientModel } from '../types/ClientModel';
import { Link } from '@tanstack/react-router';

interface ClientListItemProps {
  client: ClientModel;
  onDelete: (id: string) => void;
}

export function ClientListItem({ client, onDelete }: ClientListItemProps) {
  return (
    <List.Item
      actions={[
        <Popconfirm
          title="Supprimer le client"
          description="Êtes-vous sûr de vouloir supprimer ce client ?"
          onConfirm={() => onDelete(client.id)}
          okText="Oui"
          cancelText="Non"
        >
          <Button type="primary" danger icon={<DeleteOutlined />} />
        </Popconfirm>,
      ]}
    >
      <Link to="/clients/$clientId" params={{ clientId: client.id }}>
        <Typography.Text strong>
          {client.prenom} {client.nom}
        </Typography.Text>
        {client.email && ` - ${client.email}`}
      </Link>
    </List.Item>
  );
}