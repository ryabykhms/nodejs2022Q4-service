import { Module } from '@nestjs/common';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { ArtistsStorage } from './storages/artists.storage';

@Module({
  imports: [TracksModule, AlbumsModule],
  controllers: [ArtistsController],
  providers: [ArtistsService, ArtistsStorage],
})
export class ArtistsModule {}
