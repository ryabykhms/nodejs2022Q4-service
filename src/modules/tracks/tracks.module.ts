import { Module } from '@nestjs/common';
import { TracksStorage } from './storages/tracks.storage';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
  exports: [TracksService],
  controllers: [TracksController],
  providers: [TracksService, TracksStorage],
})
export class TracksModule {}
