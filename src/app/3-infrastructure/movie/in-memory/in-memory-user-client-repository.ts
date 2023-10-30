import { UserClient } from '@project/domain/entities/movie/user-client';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { USER_CLIENTS } from './in-memory-user-client';
import { Movie } from '@project/domain/entities/movie/movie';
import { MOVIES } from './in-memory-movies';
import { SortOrder } from '@project/application/movie/common/models/sort-order';
import { InMemorySortBy } from './in-memory-sort-by';
import { IUserClientRepository } from '@project/application/movie/contracts/repositories/i-user-client-repository';
import { IAddMovieToFavoriteMoviesRequest } from '@project/application/movie/use-cases/add-movie-to-favorites-use-case/request/i-add-movie-to-favorite-movies-request';
import { IRemoveMovieToFavoriteMoviesRequest } from '@project/application/movie/use-cases/remove-movie-to-favorites-use-case/request/i-remove-movie-to-favorites-request';

export class InMemoryUserClientRepository implements IUserClientRepository {
  private readonly _userClients$: BehaviorSubject<Array<UserClient>> = new BehaviorSubject<Array<UserClient>>(USER_CLIENTS);
  public userClients$: Observable<Array<UserClient>> = this._userClients$.asObservable();

  addMovieToFavoriteMovies(addMovieToFavoriteMoviesRequest: IAddMovieToFavoriteMoviesRequest): Observable<void> {
    const userClients: Array<UserClient> = this._userClients$.getValue();
    const movieSearched: Movie | undefined = MOVIES.find((movie: Movie) => movie.id === addMovieToFavoriteMoviesRequest.movieId);
    const userClientSearched: UserClient | undefined = userClients.find((userClient: UserClient) => userClient.id === addMovieToFavoriteMoviesRequest.userClientId);

    if (userClientSearched && movieSearched) {
      userClientSearched.favoriteMovies = [...new Set<Movie>([...userClientSearched.favoriteMovies, movieSearched])];

      this._userClients$.next([...userClients]);
    }

    return EMPTY;
  }

  getFavoriteMoviesByUserId(userId: number, orderBy?: SortOrder): Observable<Movie[]> {
    const userClientSearched: UserClient | undefined = this._userClients$.getValue().find((userClient: UserClient) => userClient.id === userId);

    if (userClientSearched) {
      return of(InMemorySortBy.execute(userClientSearched.favoriteMovies, orderBy));
    }

    return of([]);
  }

  removeMovieToFavoriteMovies(removeMovieToFavoriteMoviesRequest: IRemoveMovieToFavoriteMoviesRequest): Observable<void> {
    const userClients: Array<UserClient> = this._userClients$.getValue();
    const movieSearched: Movie | undefined = MOVIES.find((movie: Movie) => movie.id === removeMovieToFavoriteMoviesRequest.movieId);
    const userClientSearched: UserClient | undefined = userClients.find((userClient: UserClient) => userClient.id === removeMovieToFavoriteMoviesRequest.userClientId);

    if (userClientSearched && movieSearched) {
      userClientSearched.favoriteMovies = userClientSearched.favoriteMovies.filter((favorite: Movie) => favorite.id !== removeMovieToFavoriteMoviesRequest.movieId);

      this._userClients$.next([...userClients]);
    }

    return EMPTY;
  }
}
