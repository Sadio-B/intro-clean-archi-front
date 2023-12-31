import { Observable } from 'rxjs';
import { IUserClientRepository } from '../../contracts/repositories/i-user-client-repository';
import { IRemoveMovieToFavoriteMoviesRequest } from './request/i-remove-movie-to-favorites-request';

export class RemoveMovieToFavoritesUseCase {
  public constructor(private readonly userClientRepository: IUserClientRepository) {}

  public execute(removeMovieToFavoriteMoviesRequest: IRemoveMovieToFavoriteMoviesRequest): Observable<void> {
    return this.userClientRepository.removeMovieToFavoriteMovies(removeMovieToFavoriteMoviesRequest);
  }
}
