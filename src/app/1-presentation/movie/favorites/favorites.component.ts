import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '@project/domain/entities/movie/movie';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  @Input() favorites$: Observable<Array<Movie>> | undefined;

  trackByMovieId(_index: number, movie: Movie): number {
    return movie.id;
  }
}
