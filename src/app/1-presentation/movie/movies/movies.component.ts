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
  @Input() public moviesToDisplay$: Observable<Array<MovieToDisplay>> | undefined;
  @Output() public selectSortOrderEvent: EventEmitter<SortOrder> = new EventEmitter<SortOrder>();
  @Output() public addtoFavoritesEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() public removetoFavoritesEvent: EventEmitter<number> = new EventEmitter<number>();

  public onChangeSortOrderSelection(event: Event): void {
    const sortOrder: SortOrder = (event.target as HTMLSelectElement).value as SortOrder;

    this.selectSortOrderEvent.emit(sortOrder);
  }

  public onClickAddtoFavoritesButton(movieId: number): void {
    this.addtoFavoritesEvent.emit(movieId);
  }

  public onClickRemvetoFavoritesButton(movieId: number): void {
    this.removetoFavoritesEvent.emit(movieId);
  }

  public trackByMovieId(_index: number, movieToDisplay: MovieToDisplay): number {
    return movieToDisplay.id;
  }
}
