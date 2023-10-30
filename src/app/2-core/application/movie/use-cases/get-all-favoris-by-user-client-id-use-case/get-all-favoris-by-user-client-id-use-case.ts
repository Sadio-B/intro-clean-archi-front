import { Observable } from 'rxjs';
import { Movie } from '@project/domain/entities/movie/movie';
import { IUserClientRepository } from '../../contracts/repositories/i-user-client-repository';
import { SortOrder } from '../../common/models/sort-order';

export class GetAllFavorisByUserClientIdUseCase {
  constructor(private readonly userClientRepository: IUserClientRepository) {}

  execute(userClientId: number, sortOrder?: SortOrder): Observable<Array<Movie>> {
    return this.userClientRepository.getFavoriteMoviesByUserId(userClientId, sortOrder);
  }
}
