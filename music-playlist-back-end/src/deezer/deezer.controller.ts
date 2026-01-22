import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { DeezerService } from './deezer.service';
import { SearchResponseDto, SongResponseDto } from './dto/song-response.dto';

@Controller('deezer')
export class DeezerController {
  constructor(private readonly deezerService: DeezerService) {}

  /**
   * Search for songs
   * GET /deezer/search?q=search_term&limit=25
   */
  @Get('search')
  async searchSongs(
    @Query('q') query: string,
    @Query('limit') limit?: string,
  ): Promise<SearchResponseDto> {
    const limitNum = limit ? parseInt(limit, 10) : 25;
    return this.deezerService.searchSongs(query, limitNum);
  }

  /**
   * Get top charts
   * GET /deezer/charts?limit=25
   */
  @Get('charts')
  async getTopCharts(@Query('limit') limit?: string): Promise<SearchResponseDto> {
    const limitNum = limit ? parseInt(limit, 10) : 25;
    return this.deezerService.getTopCharts(limitNum);
  }

  /**
   * Get a specific track by ID
   * GET /deezer/track/:id
   */
  @Get('track/:id')
  async getTrackById(@Param('id', ParseIntPipe) id: number): Promise<SongResponseDto> {
    return this.deezerService.getTrackById(id);
  }
}
