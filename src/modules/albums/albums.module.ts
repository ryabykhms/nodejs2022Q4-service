import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../artists/entities/artists.entity';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { Album } from './entities/albums.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Artist])],
  exports: [AlbumsService],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
