import { IsString, IsUrl, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateAuthorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
  
  @IsUrl()
  @IsOptional()
  photoUrl?: string;
}
