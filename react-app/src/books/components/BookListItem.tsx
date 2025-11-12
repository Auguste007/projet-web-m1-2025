import { useState } from 'react';
import type { BookModel, UpdateBookModel } from '../BookModel';
import { Avatar, Button, Col, Input, Row, Space, Typography } from 'antd';
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Link } from '@tanstack/react-router';

interface BookListItemProps {
  book: BookModel;
  onDelete: (id: string) => void;
  onUpdate: (id: string, input: UpdateBookModel) => void;
}

export function BookListItem({ book, onDelete, onUpdate }: BookListItemProps) {
  const [title, setTitle] = useState(book.title);
  const [isEditing, setIsEditing] = useState(false);

  const onCancelEdit = () => {
    setIsEditing(false);
    setTitle(book.title);
  };

  const onValidateEdit = () => {
    onUpdate(book.id, { title });
    setIsEditing(false);
  };

  return (
    <Row
      align="middle"
      style={{
        width: '100%',
        padding: '10px',
        backgroundColor: '#fafafa',
        borderRadius: '8px',
        marginBottom: '1rem',
        border: '1px solid #f0f0f0',
      }}
    >
     
      <Col span={2}>
        <Avatar shape="square" size={48} src={book.photoUrl} />
      </Col>

     
      <Col span={16}>
        <Space direction="vertical" align="start" size={0}>
          {isEditing ? (
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          ) : (
            <Typography.Title level={5} style={{ margin: 0 }}>
              <Link to={`/books/$bookId`} params={{ bookId: book.id }}>
                {book.title}
              </Link>
            </Typography.Title>
          )}
          <Typography.Text type="secondary">
            Par {book.author.firstName} {book.author.lastName} - Publié en {book.yearPublished}
          </Typography.Text>
        </Space>
      </Col>

      <Col span={6} style={{ textAlign: 'right' }}>
        <Space>
          {isEditing ? (
            <>
              <Button type="primary" onClick={onValidateEdit} icon={<CheckOutlined />} />
              <Button onClick={onCancelEdit} icon={<CloseOutlined />} />
            </>
          ) : (
            <Button type="primary" onClick={() => setIsEditing(true)} icon={<EditOutlined />} />
          )}
          <Button type="primary" danger onClick={() => onDelete(book.id)} icon={<DeleteOutlined />} />
        </Space>
      </Col>
    </Row>
  );
}