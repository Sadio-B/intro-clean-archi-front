import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, combineLatest, concat, of, takeUntil } from 'rxjs';
import { SortOrder } from '../../2-core/application/movie/common/models/sort-order';
import { AddMovieToFavoritesUseCase } from '../../2-core/application/movie/use-cases/add-movie-to-favorites-use-case/add-movie-to-favorites-use-case';
import { GetAllMoviesUseCase } from '../../2-core/application/movie/use-cases/get-all-movies-use-case/get-all-movies-use-case';
import { Movie } from '../../2-core/domain/entities/movie/movie';
import { GetAllFavorisByUserClientIdUseCase } from '../../2-core/application/movie/use-cases/get-all-favoris-by-user-client-id-use-case/get-all-favoris-by-user-client-id-use-case';
import { MovieToDisplay } from './common/movie-to-display';
import { RemoveMovieToFavoritesUseCase } from 'src/app/2-core/application/movie/use-cases/remove-movie-to-favorites-use-case/remove-movie-to-favorites-use-case';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit, OnDestroy {
  moviesToDisplay$!: Observable<Array<MovieToDisplay>>;

  private _favorites$: Subject<Array<Movie>> = new Subject();
  favorites$: Observable<Array<Movie>> = this._favorites$.asObservable();

  private _movies$: Subject<Array<Movie>> = new Subject();
  private movies$: Observable<Array<Movie>> = this._movies$.asObservable();

  private destroy$: Subject<void> = new Subject();

  constructor(
    @Inject('GetAllMoviesUseCase')
    private readonly getAllMoviesUseCase: GetAllMoviesUseCase,
    @Inject('GetAllFavorisByUserClientIdUseCase')
    private readonly getAllFavorisByUserClientIdUseCase: GetAllFavorisByUserClientIdUseCase,
    @Inject('AddMovieToFavoritesUseCase')
    private readonly addMovieToFavoritesUseCase: AddMovieToFavoritesUseCase,
    @Inject('RemoveMovieToFavoritesUseCase')
    private readonly removeMovieToFavoritesUseCase: RemoveMovieToFavoritesUseCase
  ) {}

  ngOnInit(): void {
    this.getMoviesToDisplay();
    this.getMovies();
    this.getFavorites();
  }

  onSelectSortOrder(sortOrder: SortOrder): void {
    this.getAllMoviesUseCase
      .execute(sortOrder)
      .pipe(takeUntil(this.destroy$))
      .subscribe((movies: Array<Movie>) => {
        this._movies$.next(movies);
      });
  }

  onAddtoFavorites(movieId: number): void {
    concat(
      this.addMovieToFavoritesUseCase.execute({
        movieId: movieId,
        userClientId: 1,
      }),
      this.getAllFavorisByUserClientIdUseCase.execute(1)
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: void | Movie[]) => {
        if (Array.isArray(result)) {
          this._favorites$.next(result);
        }
      });
  }

  onRemovetoFavorites(movieId: number): void {
    concat(
      this.removeMovieToFavoritesUseCase.execute({
        movieId: movieId,
        userClientId: 1,
      }),
      this.getAllFavorisByUserClientIdUseCase.execute(1)
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: void | Movie[]) => {
        if (Array.isArray(result)) {
          this._favorites$.next(result);
        }
      });
  }

  private getMovies(): void {
    this.getAllMoviesUseCase
      .execute('byDescendingNote')
      .pipe(takeUntil(this.destroy$))
      .subscribe((movies: Array<Movie>) => {
        this._movies$.next(movies);
      });
  }

  private getFavorites(): void {
    this.getAllFavorisByUserClientIdUseCase
      .execute(1)
      .pipe(takeUntil(this.destroy$))
      .subscribe((favorites: Array<Movie>) => {
        this._favorites$.next(favorites);
      });
  }

  private getMoviesToDisplay(): void {
    combineLatest([this.movies$, this.favorites$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([movies, favorites]: [Movie[], Movie[]]) => {
        const moviesToDisplay: MovieToDisplay[] = [];

        for (const movie of movies) {
          moviesToDisplay.push({
            id: movie.id,
            isInFavorites: !!favorites.find((favorite: Movie) => favorite.id === movie.id),
            note: movie.note,
            poster: movie.poster,
            releaseDate: movie.releaseDate,
            title: movie.title,
          });
        }

        this.moviesToDisplay$ = of(moviesToDisplay);
      });
  }

  trackByMovieId(_index: number, movie: Movie): number {
    return movie.id;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
