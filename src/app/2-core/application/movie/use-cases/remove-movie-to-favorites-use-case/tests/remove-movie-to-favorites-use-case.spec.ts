import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { IUserClientRepository } from '@project/application/movie/contracts/repositories/i-user-client-repository';
import { UserClientRepository } from '@project/infrastructure/movie/real/user-client-repository';
import { RemoveMovieToFavoritesUseCase } from '../remove-movie-to-favorites-use-case';
import { IRemoveMovieToFavoriteMoviesRequest } from '../request/i-remove-movie-to-favorites-request';

describe('Remove movie from favorites for an user client use case', () => {
  let httpClient: jasmine.SpyObj<HttpClient>;
  let userClientRepository: IUserClientRepository;
  let removeMovieToFavoritesUseCase: RemoveMovieToFavoritesUseCase;

  beforeEach(() => {
    httpClient = jasmine.createSpyObj<HttpClient>('HttpClient', ['delete']);
    userClientRepository = new UserClientRepository(httpClient);
    removeMovieToFavoritesUseCase = new RemoveMovieToFavoritesUseCase(userClientRepository);
  });

  describe('execute', () => {
    it('should call api with correct url', (done: DoneFn) => {
      const request: IRemoveMovieToFavoriteMoviesRequest = { movieId: 2, userClientId: 1 };
      httpClient.delete.and.returnValue(of(null));

      removeMovieToFavoritesUseCase.execute(request).subscribe(() => {
        expect(httpClient.delete).toHaveBeenCalledWith(`api/client/${request.userClientId}/movie/${request.movieId}/favorite`);
        done();
      });
    });
  });
});
