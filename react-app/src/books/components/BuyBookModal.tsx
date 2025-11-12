import { Button, Modal, Select, DatePicker } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import type { ClientModel } from '../../clients/types/ClientModel'; 

interface BuyBookModalProps {
  bookId: string;
}

export function BuyBookModal({ bookId }: BuyBookModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [clients, setClients] = useState<ClientModel[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    
    if (isOpen) {
      axios.get('http://localhost:3000/clients').then(response => {
        setClients(response.data);
      });
    }
  }, [isOpen]);

  const handleBuy = () => {
    if (!selectedClientId || !selectedDate) return;

    axios.post('http://localhost:3000/sales', {
      clientId: selectedClientId,
      bookId: bookId,
      dateAchat: selectedDate.toISOString(),
    }).then(() => {
      console.log('Vente enregistrée !');
      setIsOpen(false); 
    }).catch(err => {
      console.error("Erreur lors de l'enregistrement de la vente:", err);
    });
  };

  return (
    <>
      <Button
        type="primary"
        icon={<ShoppingCartOutlined />}
        onClick={() => setIsOpen(true)}
      >
        Acheter ce livre
      </Button>

      <Modal
        title="Enregistrer une vente"
        open={isOpen}
        onOk={handleBuy}
        onCancel={() => setIsOpen(false)}
        okText="Enregistrer"
        cancelText="Annuler"
        okButtonProps={{ disabled: !selectedClientId || !selectedDate }}
      >
        <p>Sélectionnez un client et une date d'achat.</p>
        <Select
          placeholder="Choisir un client"
          style={{ width: '100%', marginBottom: '1rem' }}
          onChange={(value) => setSelectedClientId(value)}
          options={clients.map(client => ({
            label: `${client.prenom} ${client.nom}`,
            value: client.id,
          }))}
        />
        <DatePicker
          style={{ width: '100%' }}
          placeholder="Date d'achat"
          onChange={(date) => setSelectedDate(date ? date.toDate() : null)}
        />
      </Modal>
    </>
  );
}