import { UserClientRepository } from '@project/infrastructure/movie/real/user-client-repository';
import { AddMovieToFavoritesUseCase } from '../add-movie-to-favorites-use-case';
import { HttpClient } from '@angular/common/http';
import { IUserClientRepository } from '@project/application/movie/contracts/repositories/i-user-client-repository';
import { IAddMovieToFavoriteMoviesRequest } from '../request/i-add-movie-to-favorite-movies-request';
import { of } from 'rxjs';

describe('Add movie to favorites use case', () => {
  let httpClient: jasmine.SpyObj<HttpClient>;
  let userClientRepository: IUserClientRepository;
  let addMovieToFavoritesUseCase: AddMovieToFavoritesUseCase;

  beforeEach(() => {
    httpClient = jasmine.createSpyObj<HttpClient>('HttpClient', ['post']);
    userClientRepository = new UserClientRepository(httpClient);
    addMovieToFavoritesUseCase = new AddMovieToFavoritesUseCase(userClientRepository);
  });

  describe('execute', () => {
    it('should call api with correct url', (done: DoneFn) => {
      const request: IAddMovieToFavoriteMoviesRequest = { movieId: 2, userClientId: 1 };

      httpClient.post.and.returnValue(of(null));

      addMovieToFavoritesUseCase.execute(request).subscribe(() => {
        expect(httpClient.post).toHaveBeenCalledWith(`api/client/${request.userClientId}/movie/${request.movieId}/favorite`, null);
        done();
      });
    });
  });
});
