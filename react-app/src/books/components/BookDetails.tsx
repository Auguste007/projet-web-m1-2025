import { Skeleton, Space, Typography, Breadcrumb, List, Avatar } from 'antd';
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
  const { isLoading, book, sales, loadBookDetails } = useBookDetailsProvider(id);

  useEffect(() => {
    loadBookDetails();
  }, [id]);

  return (
    <div style={{ padding: '1rem' }}>
      <Breadcrumb style={{ marginBottom: '16px' }}>
        <Breadcrumb.Item>
          <Link to={booksRoute.to}>Books</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {isLoading ? 'Chargement...' : book?.title}
        </Breadcrumb.Item>
      </Breadcrumb>
      
      <Link to={booksRoute.to} style={{ marginBottom: '16px', display: 'inline-block' }}>
        <ArrowLeftOutlined /> Retour à la liste
      </Link>

      {isLoading || !book ? (
        <Skeleton active />
      ) : (
        <Space direction="vertical" align="start" style={{ width: '100%' }}>
          <Typography.Title level={1} style={{ margin: 0 }}>{book.title}</Typography.Title>
          <Typography.Title level={3} style={{ marginTop: 0 }}>
            Par {book.author.firstName} {book.author.lastName}
          </Typography.Title>
          <Typography.Text>Publié en {book.yearPublished}</Typography.Text>
          <div style={{ marginTop: '2rem' }}>
            <BuyBookModal bookId={book.id} />
          </div>
          <Typography.Title level={3} style={{ marginTop: '2rem' }}>
            Acheté par :
          </Typography.Title>
          <List
            style={{ width: '100%' }}
            itemLayout="horizontal"
            dataSource={sales}
            renderItem={(sale) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={sale.client.photoUrl} />}
                  title={<Link to="/clients/$clientId" params={{clientId: sale.client.id}}>{sale.client.prenom} {sale.client.nom}</Link>}
                  description={`Acheté le ${new Date(sale.dateAchat).toLocaleDateString()}`}
                />
              </List.Item>
            )}
          />
        </Space>
      )}
    </div>
  );
};