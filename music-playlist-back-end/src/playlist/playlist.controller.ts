import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { AddSongDto } from './dto/add-song.dto';

@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  /**
   * POST /playlists - สร้าง playlist ใหม่
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistService.create(createPlaylistDto);
  }

  /**
   * GET /playlists - ดูรายการ playlists ทั้งหมด
   */
  @Get()
  findAll() {
    return this.playlistService.findAll();
  }

  /**
   * GET /playlists/:id - ดู playlist ตาม ID
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistService.findOne(id);
  }

  /**
   * PATCH /playlists/:id - อัพเดต playlist
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistService.update(id, updatePlaylistDto);
  }

  /**
   * DELETE /playlists/:id - ลบ playlist
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.playlistService.remove(id);
  }

  /**
   * POST /playlists/:id/songs - เพิ่มเพลงเข้า playlist
   */
  @Post(':id/songs')
  addSong(@Param('id') id: string, @Body() addSongDto: AddSongDto) {
    return this.playlistService.addSong(id, addSongDto.songId);
  }

  /**
   * DELETE /playlists/:id/songs/:songId - ลบเพลงออกจาก playlist
   */
  @Delete(':id/songs/:songId')
  removeSong(@Param('id') id: string, @Param('songId') songId: string) {
    return this.playlistService.removeSong(id, parseInt(songId, 10));
  }
}
