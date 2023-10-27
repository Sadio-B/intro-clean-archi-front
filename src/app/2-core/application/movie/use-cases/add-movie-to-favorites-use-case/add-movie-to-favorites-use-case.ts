import { Observable } from 'rxjs';
import { IUserClientRepository } from '../../contracts/repositories/i-user-client-repository';
import { IAddMovieToFavoriteMoviesRequest } from './request/i-add-movie-to-favorite-movies-request';

export class AddMovieToFavoritesUseCase {
  constructor(private readonly userClientRepository: IUserClientRepository) {}

  execute(addMovieToFavoriteMoviesRequest: IAddMovieToFavoriteMoviesRequest): Observable<void> {
    return this.userClientRepository.addMovieToFavoriteMovies(addMovieToFavoriteMoviesRequest);
  }
}
