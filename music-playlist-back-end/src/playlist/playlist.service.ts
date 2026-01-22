import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlaylistService {
  // In-memory storage (ในโปรเจคจริงควรใช้ database)
  private playlists: Playlist[] = [];

  /**
   * สร้าง playlist ใหม่
   */
  create(createPlaylistDto: CreatePlaylistDto): Playlist {
    const newPlaylist: Playlist = {
      id: uuidv4(),
      name: createPlaylistDto.name,
      description: createPlaylistDto.description,
      songs: createPlaylistDto.songs || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.playlists.push(newPlaylist);
    return newPlaylist;
  }

  /**
   * ดูรายการ playlists ทั้งหมด
   */
  findAll(): Playlist[] {
    return this.playlists;
  }

  /**
   * ดู playlist ตาม ID
   */
  findOne(id: string): Playlist {
    const playlist = this.playlists.find((p) => p.id === id);
    if (!playlist) {
      throw new NotFoundException(`Playlist with ID ${id} not found`);
    }
    return playlist;
  }

  /**
   * อัพเดต playlist
   */
  update(id: string, updatePlaylistDto: UpdatePlaylistDto): Playlist {
    const playlistIndex = this.playlists.findIndex((p) => p.id === id);
    if (playlistIndex === -1) {
      throw new NotFoundException(`Playlist with ID ${id} not found`);
    }

    const updatedPlaylist: Playlist = {
      ...this.playlists[playlistIndex],
      ...updatePlaylistDto,
      updatedAt: new Date(),
    };

    this.playlists[playlistIndex] = updatedPlaylist;
    return updatedPlaylist;
  }

  /**
   * ลบ playlist
   */
  remove(id: string): { message: string } {
    const playlistIndex = this.playlists.findIndex((p) => p.id === id);
    if (playlistIndex === -1) {
      throw new NotFoundException(`Playlist with ID ${id} not found`);
    }

    this.playlists.splice(playlistIndex, 1);
    return { message: `Playlist with ID ${id} has been deleted` };
  }

  /**
   * เพิ่มเพลงเข้า playlist
   */
  addSong(id: string, songId: number): Playlist {
    const playlistIndex = this.playlists.findIndex((p) => p.id === id);
    if (playlistIndex === -1) {
      throw new NotFoundException(`Playlist with ID ${id} not found`);
    }

    const playlist = this.playlists[playlistIndex];
    
    // ตรวจสอบว่าเพลงนี้มีอยู่ใน playlist แล้วหรือยัง
    if (playlist.songs.includes(songId)) {
      throw new BadRequestException('This song is already in the playlist');
    }
    
    playlist.songs.push(songId);
    playlist.updatedAt = new Date();

    return playlist;
  }

  /**
   * ลบเพลงออกจาก playlist
   */
  removeSong(id: string, songId: number): Playlist {
    const playlistIndex = this.playlists.findIndex((p) => p.id === id);
    if (playlistIndex === -1) {
      throw new NotFoundException(`Playlist with ID ${id} not found`);
    }

    const playlist = this.playlists[playlistIndex];
    playlist.songs = playlist.songs.filter((s) => s !== songId);
    playlist.updatedAt = new Date();

    return playlist;
  }
}
