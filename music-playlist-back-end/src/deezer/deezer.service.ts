import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { SearchResponseDto, SongResponseDto } from './dto/song-response.dto';

@Injectable()
export class DeezerService {
  private readonly deezerApiUrl = 'https://api.deezer.com';

  /**
   * Search for songs on Deezer
   * @param query Search query string
   * @param limit Number of results to return (default: 25)
   * @returns SearchResponseDto containing array of songs and total count
   */
  async searchSongs(query: string, limit: number = 25): Promise<SearchResponseDto> {
    try {
      const response = await axios.get(`${this.deezerApiUrl}/search`, {
        params: {
          q: query,
          limit: limit,
        },
      });

      const songs: SongResponseDto[] = response.data.data.map((track: any) => ({
        id: track.id,
        title: track.title,
        artist: {
          id: track.artist.id,
          name: track.artist.name
        },
        album: {
          id: track.album.id,
          title: track.album.title,
          cover_small: track.album.cover_small
        },
        duration: track.duration,
        preview: track.preview
      }));

      return {
        data: songs,
        total: response.data.total,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch songs from Deezer',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Get a specific track by ID
   * @param trackId Deezer track ID
   * @returns SongResponseDto containing song details
   */
  async getTrackById(trackId: number): Promise<SongResponseDto> {
    try {
      const response = await axios.get(`${this.deezerApiUrl}/track/${trackId}`);
      const track = response.data;

      return {
        id: track.id,
        title: track.title,
        artist: {
          id: track.artist.id,
          name: track.artist.name,
        },
        album: {
          id: track.album.id,
          title: track.album.title,
          cover: track.album.cover,
          cover_small: track.album.cover_small,
          cover_medium: track.album.cover_medium,
          cover_big: track.album.cover_big,
          cover_xl: track.album.cover_xl,
        },
        duration: track.duration,
        preview: track.preview,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch track from Deezer',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  /**
   * Get top charts from Deezer
   * @param limit Number of results to return (default: 25)
   * @returns SearchResponseDto containing array of top songs
   */
  async getTopCharts(limit: number = 25): Promise<SearchResponseDto> {
    try {
      const response = await axios.get(`${this.deezerApiUrl}/chart`, {
        params: {
          limit: limit,
        },
      });

      const songs: SongResponseDto[] = response.data.tracks.data.map((track: any) => ({
        id: track.id,
        title: track.title,
        artist: {
          id: track.artist.id,
          name: track.artist.name,
        },
        album: {
          id: track.album.id,
          title: track.album.title,
          cover_small: track.album.cover_small
        },
        duration: track.duration,
        preview: track.preview,
      }));

      return {
        data: songs,
        total: songs.length,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch top charts from Deezer',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
