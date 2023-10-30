import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SortOrder } from '@project/application/movie/common/models/sort-order';
import { IMovieRepository } from '@project/application/movie/contracts/repositories/i-movie-repository';
import { Movie } from '@project/domain/entities/movie/movie';

const BASE_URL: string = 'api/movie';

export class MovieRepository implements IMovieRepository {
  public constructor(private readonly httpClient: HttpClient) {}

  public getAll(sortOrder?: SortOrder): Observable<Array<Movie>> {
    if (sortOrder) {
      const params: HttpParams = new HttpParams().set('orderBy', sortOrder);

      return this.httpClient.get<Array<Movie>>(BASE_URL, { params });
    }

    return this.httpClient.get<Array<Movie>>(BASE_URL);
  }
}
