import { Observable } from 'rxjs';
import { Movie } from '@project/domain/entities/movie/movie';
import { SortOrder } from '../../common/models/sort-order';

export interface IMovieRepository {
  getAll(sortOrder?: SortOrder): Observable<Array<Movie>>;
}
