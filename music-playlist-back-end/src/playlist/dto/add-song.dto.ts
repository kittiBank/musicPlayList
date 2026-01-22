import { IsNumber, IsNotEmpty } from 'class-validator';

export class AddSongDto {
  @IsNumber()
  @IsNotEmpty()
  songId: number; // Deezer song ID
}
