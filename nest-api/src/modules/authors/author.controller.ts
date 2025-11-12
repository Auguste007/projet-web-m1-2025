import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto, UpdateAuthorDto } from './author.dto';
import type { AuthorId } from './author.entity';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAllAuthors() {
    return this.authorService.getAllAuthors();
  }

  @Post()
  public async createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.createAuthor(createAuthorDto);
  }

  @Get(':id')
  getAuthorById(@Param('id') id: AuthorId) {
    return this.authorService.getAuthorById(id);
  }

  @Patch(':id')
  updateAuthor(@Param('id') id: AuthorId, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.updateAuthor(id, updateAuthorDto);
  }

  @Delete(':id')
  deleteAuthor(@Param('id') id: AuthorId) {
    return this.authorService.deleteAuthor(id);
  }
}
