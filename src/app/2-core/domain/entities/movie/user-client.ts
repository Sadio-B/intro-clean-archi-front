import { Movie } from './movie';

export class UserClient {
  public id!: number;
  public name!: string;
  public favoriteMovies: Array<Movie> = [];
}
