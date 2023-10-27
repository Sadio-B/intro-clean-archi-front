import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SortOrder } from 'src/app/2-core/application/movie/common/models/sort-order';
import { IUserClientRepository } from 'src/app/2-core/application/movie/contracts/repositories/i-user-client-repository';
import { IAddMovieToFavoriteMoviesRequest } from 'src/app/2-core/application/movie/use-cases/add-movie-to-favorites-use-case/request/i-add-movie-to-favorite-movies-request';
import { IRemoveMovieToFavoriteMoviesRequest } from 'src/app/2-core/application/movie/use-cases/remove-movie-to-favorites-use-case/request/i-remove-movie-to-favorites-request';
import { Movie } from 'src/app/2-core/domain/entities/movie/movie';

const BASE_URL: string = 'api/client';

export class UserClientRepository implements IUserClientRepository {
  constructor(private readonly httpClient: HttpClient) {}

  addMovieToFavoriteMovies(addMovieToFavoriteMoviesRequest: IAddMovieToFavoriteMoviesRequest): Observable<void> {
    const url: string = `${BASE_URL}/${addMovieToFavoriteMoviesRequest.userClientId}/movie/${addMovieToFavoriteMoviesRequest.movieId}/favorite`;

    return this.httpClient.post<void>(url, null);
  }

  getFavoriteMoviesByUserId(userId: number, sortOrder?: SortOrder): Observable<Movie[]> {
    const url: string = `${BASE_URL}/${userId}/movie/favorite`;

    if (sortOrder) {
      const params: HttpParams = new HttpParams().set('orderBy', sortOrder);

      return this.httpClient.get<Array<Movie>>(url, { params });
    }

    return this.httpClient.get<Array<Movie>>(url);
  }

  removeMovieToFavoriteMovies(removeMovieToFavoriteMoviesRequest: IRemoveMovieToFavoriteMoviesRequest): Observable<void> {
    const url: string = `${BASE_URL}/${removeMovieToFavoriteMoviesRequest.userClientId}/movie/${removeMovieToFavoriteMoviesRequest.movieId}/favorite`;

    return this.httpClient.delete<void>(url);
  }
}
