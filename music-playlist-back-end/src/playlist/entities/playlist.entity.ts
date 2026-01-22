export class Playlist {
  id: string;
  name: string;
  description?: string;
  songs: number[]; // Array of Deezer song IDs
  createdAt: Date;
  updatedAt: Date;
}
