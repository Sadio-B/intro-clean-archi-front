import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { AddMovieToFavoritesUseCase } from '@project/application/movie/use-cases/add-movie-to-favorites-use-case/add-movie-to-favorites-use-case';
import { GetAllFavorisByUserClientIdUseCase } from '@project/application/movie/use-cases/get-all-favoris-by-user-client-id-use-case/get-all-favoris-by-user-client-id-use-case';
import { GetAllMoviesUseCase } from '@project/application/movie/use-cases/get-all-movies-use-case/get-all-movies-use-case';
import { InMemoryMovieRepository } from '@project/infrastructure/movie/in-memory/in-memory-movie-repository';
import { InMemoryUserClientRepository } from '@project/infrastructure/movie/in-memory/in-memory-user-client-repository';
import { RemoveMovieToFavoritesUseCase } from '@project/application/movie/use-cases/remove-movie-to-favorites-use-case/remove-movie-to-favorites-use-case';
import { SharedModule } from '../../common/modules/shared.module';
import { MovieRoutingModule } from './movie-routing.module';

@NgModule({
  declarations: [MovieRoutingModule.components],
  imports: [MatTabsModule, MovieRoutingModule, SharedModule],
  providers: [
    {
      provide: 'GetAllMoviesUseCase',
      useFactory: () => {
        return new GetAllMoviesUseCase(new InMemoryMovieRepository());
      },
    },
    {
      provide: 'GetAllFavorisByUserClientIdUseCase',
      useFactory: () => {
        return new GetAllFavorisByUserClientIdUseCase(new InMemoryUserClientRepository());
      },
    },
    {
      provide: 'AddMovieToFavoritesUseCase',
      useFactory: () => {
        return new AddMovieToFavoritesUseCase(new InMemoryUserClientRepository());
      },
    },
    {
      provide: 'RemoveMovieToFavoritesUseCase',
      useFactory: () => {
        return new RemoveMovieToFavoritesUseCase(new InMemoryUserClientRepository());
      },
    },
  ],
})
export class MovieModule {}
