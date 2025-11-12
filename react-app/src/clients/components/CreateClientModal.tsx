
import { Button, Input, Modal, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import type { CreateClientModel } from '../types/ClientModel';

interface CreateClientModalProps {
  onCreate: (client: CreateClientModel) => void;
}

export function CreateClientModal({ onCreate }: CreateClientModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');

  const handleOk = () => {
    onCreate({ nom, prenom });
    setIsOpen(false);
    
    setNom('');
    setPrenom('');
  };

  const handleCancel = () => {
    setIsOpen(false);
    setNom('');
    setPrenom('');
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsOpen(true)}
        style={{ marginBottom: '1rem' }}
      >
        Créer un client
      </Button>

      <Modal
        title="Nouveau Client"
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: !nom || !prenom }} 
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            placeholder="Nom"
            value={nom}
            onChange={e => setNom(e.target.value)}
          />
          <Input
            placeholder="Prénom"
            value={prenom}
            onChange={e => setPrenom(e.target.value)}
          />
        </Space>
      </Modal>
    </>
  );
}