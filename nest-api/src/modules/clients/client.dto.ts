import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateClientDto {
  @IsString()
  nom: string;

  @IsString()
  prenom: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsUrl()
  @IsOptional()
  photoUrl?: string;
}

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  nom?: string;

  @IsString()
  @IsOptional()
  prenom?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsUrl()
  @IsOptional()
  photoUrl?: string;
}