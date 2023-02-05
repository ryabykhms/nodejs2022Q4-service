import { forwardRef, Module } from '@nestjs/common';
import { FavoritesModule } from '../favorites/favorites.module';
import { TracksStorage } from './storages/tracks.storage';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
  imports: [forwardRef(() => FavoritesModule)],
  exports: [TracksService],
  controllers: [TracksController],
  providers: [TracksService, TracksStorage],
})
export class TracksModule {}
