/* eslint-disable max-lines-per-function */
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { IUserClientRepository } from '@project/application/movie/contracts/repositories/i-user-client-repository';
import { UserClientRepository } from '@project/infrastructure/movie/real/user-client-repository';
import { Movie } from '@project/domain/entities/movie/movie';
import { GetAllFavorisByUserClientIdUseCase } from '../get-all-favoris-by-user-client-id-use-case';
import { SortOrder } from '@project/application/movie/common/models/sort-order';

describe('Get all favorites for an user client use case', () => {
  let httpClient: jasmine.SpyObj<HttpClient>;
  let userClientRepository: IUserClientRepository;
  let getAllFavorisByUserClientIdUseCase: GetAllFavorisByUserClientIdUseCase;

  beforeEach(() => {
    httpClient = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);
    userClientRepository = new UserClientRepository(httpClient);
    getAllFavorisByUserClientIdUseCase = new GetAllFavorisByUserClientIdUseCase(userClientRepository);
  });

  describe('execute', () => {
    it('should call api with correct url', (done: DoneFn) => {
      const userId: number = 1;
      httpClient.get.and.returnValue(of([]));

      getAllFavorisByUserClientIdUseCase.execute(userId).subscribe((movies: Array<Movie>) => {
        expect(httpClient.get).toHaveBeenCalledWith(`api/client/${userId}/movie/favorite`);
        done();
      });
    });

    it('should call api with correct url which includes query parameters when there is a sort order parameter', (done: DoneFn) => {
      const userId: number = 1;
      const sortOrder: SortOrder = 'byAscendingDate';
      const params: HttpParams = new HttpParams().set('orderBy', sortOrder);
      httpClient.get.and.returnValue(of([]));

      getAllFavorisByUserClientIdUseCase.execute(userId, sortOrder).subscribe((movies: Array<Movie>) => {
        expect(httpClient.get).toHaveBeenCalledWith(`api/client/${userId}/movie/favorite`, { params });
        done();
      });
    });

    it('should return movies when url is correct', (done: DoneFn) => {
      const userId: number = 1;
      const expectedMovies: Array<Movie> = [
        { id: 1, note: 5, poster: 'poster', releaseDate: 1, title: 'Mickey MOUSE' },
        { id: 2, note: 4, poster: 'poster', releaseDate: 2, title: 'Donald DUCK' },
      ];

      httpClient.get.and.returnValue(of(expectedMovies));

      getAllFavorisByUserClientIdUseCase.execute(userId).subscribe((movies: Array<Movie>) => {
        expect(httpClient.get).toHaveBeenCalledWith(`api/client/${userId}/movie/favorite`);
        expect(movies).toHaveSize(expectedMovies.length);
        done();
      });
    });
  });
});
