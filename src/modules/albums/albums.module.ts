import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { AlbumsStorage } from './storages/albums.storage';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumsStorage],
})
export class AlbumsModule {}
