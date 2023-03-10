import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { Artist } from './entities/artists.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  exports: [ArtistsService],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
