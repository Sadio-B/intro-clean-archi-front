import { SortOrder } from 'src/app/2-core/application/movie/common/models/sort-order';
import { Movie } from 'src/app/2-core/domain/entities/movie/movie';

export class InMemorySortBy {
  static execute(movies: Array<Movie>, orderBy?: SortOrder): Array<Movie> {
    switch (orderBy) {
      case 'byAscendingDate':
        return movies.sort((a: Movie, b: Movie) => a.releaseDate - b.releaseDate);

      case 'byDescendingDate':
        return movies.sort((a: Movie, b: Movie) => b.releaseDate - a.releaseDate);

      case 'byAscendingNote':
        return movies.sort((a: Movie, b: Movie) => a.note - b.note);

      case 'byDescendingNote':
        return movies.sort((a: Movie, b: Movie) => b.note - a.note);

      default:
        return movies;
    }
  }
}
