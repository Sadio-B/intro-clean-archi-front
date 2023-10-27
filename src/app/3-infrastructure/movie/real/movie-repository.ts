import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SortOrder } from 'src/app/2-core/application/movie/common/models/sort-order';
import { IMovieRepository } from 'src/app/2-core/application/movie/contracts/repositories/i-movie-repository';
import { Movie } from 'src/app/2-core/domain/entities/movie/movie';

const BASE_URL: string = 'api/movie';

export class MovieRepository implements IMovieRepository {
  public constructor(private readonly httpClient: HttpClient) {}

  getAll(sortOrder?: SortOrder): Observable<Array<Movie>> {
    if (sortOrder) {
      const params: HttpParams = new HttpParams().set('orderBy', sortOrder);

      return this.httpClient.get<Array<Movie>>(BASE_URL, { params });
    }

    return this.httpClient.get<Array<Movie>>(BASE_URL);
  }
}
