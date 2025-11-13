import { Button, Input, Modal, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import type { CreateAuthorModel } from '../types/AuthorModel';

interface CreateAuthorModalProps {
  onCreate: (author: CreateAuthorModel) => void;
}

export function CreateAuthorModal({ onCreate }: CreateAuthorModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleOk = () => {
    onCreate({ firstName, lastName });
    setIsOpen(false);
    setFirstName('');
    setLastName('');
  };

  const handleCancel = () => {
    setIsOpen(false);
    setFirstName('');
    setLastName('');
  };

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsOpen(true)}>
        Créer un auteur
      </Button>
      <Modal title="Nouvel Auteur" open={isOpen} onOk={handleOk} onCancel={handleCancel} okButtonProps={{ disabled: !firstName || !lastName }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input placeholder="Prénom" value={firstName} onChange={e => setFirstName(e.target.value)} />
          <Input placeholder="Nom" value={lastName} onChange={e => setLastName(e.target.value)} />
        </Space>
      </Modal>
    </>
  );
}