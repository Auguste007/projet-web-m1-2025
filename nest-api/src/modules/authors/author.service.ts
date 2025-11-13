import { Injectable } from '@nestjs/common';
import { AuthorModel, CreateAuthorModel } from './author.model';
import { AuthorRepository } from './author.repository';
import { UpdateAuthorModel } from './author.model';
import { AuthorId,AuthorEntity } from './author.entity';
import { BookRepository } from '../books/book.repository'; 
import { SaleRepository } from '../sales/sale.repository'; 

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository,
    private readonly bookRepository: BookRepository, 
    private readonly saleRepository: SaleRepository, 
  )
   {}

  public async getAllAuthors(): Promise<AuthorModel[]> {
    return this.authorRepository.getAllAuthors();
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.createAuthor(author);
  }

  public async getAuthorStats(authorId: AuthorId) {
    const books = await this.bookRepository.findBooksByAuthorId(authorId);
    if (books.length === 0) {
      return { averageSales: 0 };
    }
    const bookIds = books.map(book => book.id);
    const totalSales = await this.saleRepository.countSalesByBookIds(bookIds);
    
    return {
      averageSales: totalSales / books.length,
    };
  }

  public getAuthorById(id: AuthorId): Promise<AuthorEntity | null> {
    return this.authorRepository.getAuthorById(id);
  }

  public updateAuthor(id: AuthorId, author: UpdateAuthorModel): Promise<void> {
    return this.authorRepository.updateAuthor(id, author);
  }

  public deleteAuthor(id: AuthorId): Promise<void> {
    return this.authorRepository.deleteAuthor(id);
  }


}
