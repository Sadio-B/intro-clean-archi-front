import { Movie } from './movie';

export class UserClient {
  id!: number;
  name!: string;
  favoriteMovies: Array<Movie> = [];
}
