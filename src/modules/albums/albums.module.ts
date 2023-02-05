import { Module } from '@nestjs/common';
import { TracksModule } from '../tracks/tracks.module';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { AlbumsStorage } from './storages/albums.storage';

@Module({
  imports: [TracksModule],
  exports: [AlbumsService],
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumsStorage],
})
export class AlbumsModule {}
