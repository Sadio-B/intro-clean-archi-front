import { Observable } from 'rxjs';
import { Movie } from '@project/domain/entities/movie/movie';
import { IMovieRepository } from '../../contracts/repositories/i-movie-repository';
import { SortOrder } from '../../common/models/sort-order';

export class GetAllMoviesUseCase {
  public constructor(private readonly movieRepository: IMovieRepository) {}

  public execute(orderBy?: SortOrder): Observable<Array<Movie>> {
    return this.movieRepository.getAll(orderBy);
  }
}
