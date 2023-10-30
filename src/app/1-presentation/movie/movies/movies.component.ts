import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { SortOrder } from '@project/application/movie/common/models/sort-order';
import { MovieToDisplay } from '../common/movie-to-display';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent {
  @Input() moviesToDisplay$: Observable<Array<MovieToDisplay>> | undefined;
  @Output() selectSortOrderEvent: EventEmitter<SortOrder> = new EventEmitter<SortOrder>();
  @Output() addtoFavoritesEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() removetoFavoritesEvent: EventEmitter<number> = new EventEmitter<number>();

  onChangeSortOrderSelection(event: Event): void {
    const sortOrder: SortOrder = (event.target as HTMLSelectElement).value as SortOrder;

    this.selectSortOrderEvent.emit(sortOrder);
  }

  onClickAddtoFavoritesButton(movieId: number): void {
    this.addtoFavoritesEvent.emit(movieId);
  }

  onClickRemvetoFavoritesButton(movieId: number): void {
    this.removetoFavoritesEvent.emit(movieId);
  }

  trackByMovieId(_index: number, movieToDisplay: MovieToDisplay): number {
    return movieToDisplay.id;
  }
}
