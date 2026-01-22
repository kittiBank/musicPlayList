import { Module } from '@nestjs/common';
import { DeezerModule } from './deezer/deezer.module';
import { PlaylistModule } from './playlist/playlist.module';

@Module({
  imports: [DeezerModule, PlaylistModule],
})
export class AppModule {}
