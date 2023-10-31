import { Observable } from 'rxjs';
import { Movie } from '../../../../domain/entities/movie/movie';
import { SortOrder } from '../../common/models/sort-order';
import { IAddMovieToFavoriteMoviesRequest } from '../../use-cases/add-movie-to-favorites-use-case/request/i-add-movie-to-favorite-movies-request';
import { IRemoveMovieToFavoriteMoviesRequest } from '../../use-cases/remove-movie-to-favorites-use-case/request/i-remove-movie-to-favorites-request';

export interface IUserClientRepository {
  addMovieToFavoriteMovies(addMovieToFavoriteMoviesRequest: IAddMovieToFavoriteMoviesRequest): Observable<void>;

  getFavoriteMoviesByUserId(userId: number, sortOrder?: SortOrder): Observable<Array<Movie>>;

  removeMovieToFavoriteMovies(removeMovieToFavoriteMoviesRequest: IRemoveMovieToFavoriteMoviesRequest): Observable<void>;
}
