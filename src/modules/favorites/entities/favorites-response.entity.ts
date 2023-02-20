import { Favorites } from './favorites.entity';

export type FavoritesResponse = Omit<Favorites, 'id' | 'toResponse'>;
