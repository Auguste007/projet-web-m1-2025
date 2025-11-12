import { Injectable } from '@nestjs/common';
import { AuthorModel, CreateAuthorModel } from './author.model';
import { AuthorEntity } from './author.entity';
import { AuthorId } from './author.entity';
import { UpdateAuthorModel } from './author.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  public async getAllAuthors(): Promise<AuthorModel[]> {
    return this.authorRepository
      .createQueryBuilder('author')
      .loadRelationCountAndMap('author.booksWritten', 'author.books')
      .getMany();
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.save(this.authorRepository.create(author));
  }

  public async getAuthorById(id: AuthorId): Promise<AuthorEntity | null> {
    return this.authorRepository.findOne({ where: { id } });
  }

  public async updateAuthor(id: AuthorId, author: UpdateAuthorModel): Promise<void> {
    await this.authorRepository.update(id, author);
  }

  public async deleteAuthor(id: AuthorId): Promise<void> {
    await this.authorRepository.delete(id);
  }
}
