import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreatePlaylistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  songs?: number[]; // Array of Deezer song IDs
}
