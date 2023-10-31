import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, combineLatest, concat, of, takeUntil } from 'rxjs';
import { AddMovieToFavoritesUseCase } from '@project/application/movie/use-cases/add-movie-to-favorites-use-case/add-movie-to-favorites-use-case';
import { GetAllFavorisByUserClientIdUseCase } from '@project/application/movie/use-cases/get-all-favoris-by-user-client-id-use-case/get-all-favoris-by-user-client-id-use-case';
import { GetAllMoviesUseCase } from '@project/application/movie/use-cases/get-all-movies-use-case/get-all-movies-use-case';
import { Movie } from '@project/domain/entities/movie/movie';
import { RemoveMovieToFavoritesUseCase } from '@project/application/movie/use-cases/remove-movie-to-favorites-use-case/remove-movie-to-favorites-use-case';
import { SortOrder } from '@project/application/movie/common/models/sort-order';
import { MovieToDisplay } from './common/movie-to-display';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit, OnDestroy {
  public moviesToDisplay$!: Observable<Array<MovieToDisplay>>;

  private _favorites$: Subject<Array<Movie>> = new Subject();
  public favorites$: Observable<Array<Movie>> = this._favorites$.asObservable();

  private _movies$: Subject<Array<Movie>> = new Subject();
  private movies$: Observable<Array<Movie>> = this._movies$.asObservable();

  private destroy$: Subject<void> = new Subject();

  public constructor(
    @Inject('GetAllMoviesUseCase')
    private readonly getAllMoviesUseCase: GetAllMoviesUseCase,
    @Inject('GetAllFavorisByUserClientIdUseCase')
    private readonly getAllFavorisByUserClientIdUseCase: GetAllFavorisByUserClientIdUseCase,
    @Inject('AddMovieToFavoritesUseCase')
    private readonly addMovieToFavoritesUseCase: AddMovieToFavoritesUseCase,
    @Inject('RemoveMovieToFavoritesUseCase')
    private readonly removeMovieToFavoritesUseCase: RemoveMovieToFavoritesUseCase
  ) {}

  public ngOnInit(): void {
    this.getMoviesToDisplay();
    this.getMovies();
    this.getFavorites();
  }

  public onSelectSortOrder(sortOrder: SortOrder): void {
    this.getAllMoviesUseCase
      .execute(sortOrder)
      .pipe(takeUntil(this.destroy$))
      .subscribe((movies: Array<Movie>) => {
        this._movies$.next(movies);
      });
  }

  public onAddtoFavorites(movieId: number): void {
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

  public onRemovetoFavorites(movieId: number): void {
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

  public trackByMovieId(_index: number, movie: Movie): number {
    return movie.id;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
