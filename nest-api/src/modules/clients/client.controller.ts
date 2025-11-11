import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto, UpdateClientDto } from './client.dto';
import type { ClientId } from './client.entity';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  getAllClients() {
    return this.clientService.getAllClients();
  }

  @Get(':id')
  getClientById(@Param('id') id: ClientId) {
    return this.clientService.getClientById(id);
  }

  @Post()
  createClient(@Body() createClientDto: CreateClientDto) {
    return this.clientService.createClient(createClientDto);
  }

  @Patch(':id')
  updateClient(
    @Param('id') id: ClientId,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientService.updateClient(id, updateClientDto);
  }

  @Delete(':id')
  deleteClient(@Param('id') id: ClientId) {
    return this.clientService.deleteClient(id);
  }
}