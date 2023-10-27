import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from '../movie.component';
import { MoviesComponent } from '../movies/movies.component';
import { FavoritesComponent } from '../favorites/favorites.component';

const routes: Routes = [
  {
    path: '',
    component: MovieComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieRoutingModule {
  static components = [FavoritesComponent, MovieComponent, MoviesComponent];
}
