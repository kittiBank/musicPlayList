import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdatePlaylistDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  songs?: number[]; // Array of Deezer song IDs
}
