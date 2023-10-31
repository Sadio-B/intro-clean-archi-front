/* eslint-disable max-lines-per-function */
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { Movie } from '@project/domain/entities/movie/movie';
import { GetAllMoviesUseCase } from '../get-all-movies-use-case';
import { IMovieRepository } from '@project/application/movie/contracts/repositories/i-movie-repository';
import { MovieRepository } from '@project/infrastructure/movie/real/movie-repository';
import { SortOrder } from '@project/application/movie/common/models/sort-order';

describe('Get all movies use case', () => {
  let httpClient: jasmine.SpyObj<HttpClient>;
  let movieRepository: IMovieRepository;
  let getAllMoviesUseCase: GetAllMoviesUseCase;

  beforeEach(() => {
    httpClient = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);
    movieRepository = new MovieRepository(httpClient);
    getAllMoviesUseCase = new GetAllMoviesUseCase(movieRepository);
  });

  describe('execute', () => {
    it('should call api with correct url when there is not a sort order parameter', (done: DoneFn) => {
      httpClient.get.and.returnValue(of([]));

      getAllMoviesUseCase.execute().subscribe((movies: Array<Movie>) => {
        expect(httpClient.get).toHaveBeenCalledWith('api/movie');
        done();
      });
    });

    it('should call api with correct url which includes query parameters when there is a sort order parameter', (done: DoneFn) => {
      httpClient.get.and.returnValue(of([]));
      const sortOrder: SortOrder = 'byAscendingDate';
      const params: HttpParams = new HttpParams().set('orderBy', sortOrder);

      getAllMoviesUseCase.execute('byAscendingDate').subscribe((movies: Array<Movie>) => {
        expect(httpClient.get).toHaveBeenCalledWith('api/movie', { params });
        done();
      });
    });

    it('should return movies when url is correct', (done: DoneFn) => {
      const expectedMovies: Array<Movie> = [
        { id: 1, note: 5, poster: 'poster', releaseDate: 1, title: 'Mickey MOUSE' },
        { id: 2, note: 4, poster: 'poster', releaseDate: 2, title: 'Donald DUCK' },
      ];

      httpClient.get.and.returnValue(of(expectedMovies));

      getAllMoviesUseCase.execute().subscribe((movies: Array<Movie>) => {
        expect(httpClient.get).toHaveBeenCalledWith('api/movie');
        expect(movies).toHaveSize(expectedMovies.length);
        done();
      });
    });
  });
});
