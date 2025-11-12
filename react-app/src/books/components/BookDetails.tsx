import { Skeleton, Space, Typography } from 'antd';
import { useBookDetailsProvider } from '../providers/useBookDetailsProvider';
import { useEffect } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from '@tanstack/react-router';
import { Route as booksRoute } from '../../routes/books';
import { BuyBookModal } from './BuyBookModal';

interface BookDetailsProps {
  id: string;
}

export const BookDetails = ({ id }: BookDetailsProps) => {
  const { isLoading, book, loadBook } = useBookDetailsProvider(id);

  useEffect(() => {
    loadBook();
  }, [id]);

  if (isLoading || !book) {
    return <Skeleton active />;
  }

  return (
    <Space direction="vertical" style={{ textAlign: 'left', width: '95%', padding: '1rem' }}>
      <Link to={booksRoute.to}>
        <ArrowLeftOutlined /> Retour à la liste
      </Link>
      <Typography.Title level={1}>{book.title}</Typography.Title>
      <Typography.Title level={3}>
        Par {book.author.firstName} {book.author.lastName}
      </Typography.Title>
      <Typography.Text>Publié en {book.yearPublished}</Typography.Text>

      <div style={{ marginTop: '2rem' }}>
        <BuyBookModal bookId={book.id} /> 
      </div>
    </Space>
  );
};