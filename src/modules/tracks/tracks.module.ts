import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from '../albums/entities/albums.entity';
import { Artist } from '../artists/entities/artists.entity';
import { Track } from './entities/tracks.entity';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Track, Artist, Album])],
  exports: [TracksService],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
