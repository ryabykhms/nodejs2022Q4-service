import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/albums.entity';
import { AlbumsStorage } from './storages/albums.storage';

@Injectable()
export class AlbumsService {
  constructor(private readonly collection: AlbumsStorage) {}

  create(createAlbumDto: CreateAlbumDto): Album {
    return this.collection.create(createAlbumDto);
  }

  getAll(): Album[] {
    return this.collection.getAll();
  }

  getById(id: string): Album {
    return this.collection.getById(id);
  }

  update(id: string, data: UpdateAlbumDto): Album {
    return this.collection.update(id, data);
  }

  delete(id: string): boolean {
    return this.collection.delete(id);
  }
}
