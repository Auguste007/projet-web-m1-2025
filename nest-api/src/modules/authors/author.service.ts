import { Injectable } from '@nestjs/common';
import { AuthorModel, CreateAuthorModel } from './author.model';
import { AuthorRepository } from './author.repository';
import { UpdateAuthorModel } from './author.model';
import { AuthorId,AuthorEntity } from './author.entity';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  public async getAllAuthors(): Promise<AuthorModel[]> {
    return this.authorRepository.getAllAuthors();
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.createAuthor(author);
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
