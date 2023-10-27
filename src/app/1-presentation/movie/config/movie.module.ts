import { NgModule } from '@angular/core';
import { MovieRoutingModule } from './movie-routing.module';
import { InMemoryMovieRepository } from 'src/app/3-infrastructure/movie/in-memory/in-memory-movie-repository';
import { GetAllMoviesUseCase } from 'src/app/2-core/application/movie/use-cases/get-all-movies-use-case/get-all-movies-use-case';
import { SharedModule } from '../../common/modules/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { InMemoryUserClientRepository } from 'src/app/3-infrastructure/movie/in-memory/in-memory-user-client-repository';
import { AddMovieToFavoritesUseCase } from 'src/app/2-core/application/movie/use-cases/add-movie-to-favorites-use-case/add-movie-to-favorites-use-case';
import { GetAllFavorisByUserClientIdUseCase } from 'src/app/2-core/application/movie/use-cases/get-all-favoris-by-user-client-id-use-case/get-all-favoris-by-user-client-id-use-case';
import { RemoveMovieToFavoritesUseCase } from 'src/app/2-core/application/movie/use-cases/remove-movie-to-favorites-use-case/remove-movie-to-favorites-use-case';

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
