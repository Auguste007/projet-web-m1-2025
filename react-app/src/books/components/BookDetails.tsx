import { Skeleton, Space, Typography, Breadcrumb } from 'antd';
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

  return (
    <Space direction="vertical" style={{ textAlign: 'left', width: '95%', padding: '1rem' }}>
     
      <Breadcrumb style={{ marginBottom: '16px' }}>
        <Breadcrumb.Item>
          <Link to={booksRoute.to}>Books</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {isLoading ? 'Loading...' : book?.title}
        </Breadcrumb.Item>
      </Breadcrumb>
      
      <Link to={booksRoute.to}>
        <ArrowLeftOutlined /> Retour à la liste
      </Link>

     
      {isLoading || !book ? (
        <Skeleton active />
      ) : (
        <>
          <Typography.Title level={1}>{book.title}</Typography.Title>
          <Typography.Title level={3}>
            Par {book.author.firstName} {book.author.lastName}
          </Typography.Title>
          <Typography.Text>Publié en {book.yearPublished}</Typography.Text>

          <div style={{ marginTop: '2rem' }}>
            <BuyBookModal bookId={book.id} />
          </div>
        </>
      )}
    </Space>
  );
};
