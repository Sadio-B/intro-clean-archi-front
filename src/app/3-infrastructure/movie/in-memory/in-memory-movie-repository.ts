import { Observable } from 'rxjs/internal/Observable';
import { IMovieRepository } from '@project/application/movie/contracts/repositories/i-movie-repository';
import { Movie } from '@project/domain/entities/movie/movie';
import { MOVIES } from './in-memory-movies';
import { of, map, tap } from 'rxjs';
import { SortOrder } from '@project/application/movie/common/models/sort-order';
import { InMemorySortBy } from './in-memory-sort-by';

export class InMemoryMovieRepository implements IMovieRepository {
  public getAll(orderBy?: SortOrder): Observable<Array<Movie>> {
    return of(MOVIES).pipe(
      tap<Array<Movie>>(movies => InMemorySortBy.execute(movies, orderBy)),
      map((movies: Array<Movie>) => movies)
    );
  }
}
