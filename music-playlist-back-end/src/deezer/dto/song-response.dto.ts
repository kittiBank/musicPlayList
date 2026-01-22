export class ArtistDto {
  id: number;
  name: string;
}

export class AlbumDto {
  id: number;
  title: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
}

export class SongResponseDto {
  id: number;
  title: string;
  artist: ArtistDto;
  album: AlbumDto;
  duration: number;
  preview: string;
}

export class SearchResponseDto {
  data: SongResponseDto[];
  total: number;
}
