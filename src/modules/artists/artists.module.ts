import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { ArtistsStorage } from './storages/artists.storage';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, ArtistsStorage],
})
export class ArtistsModule {}
