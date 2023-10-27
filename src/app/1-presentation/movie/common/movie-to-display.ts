export class MovieToDisplay {
  id!: number;
  isInFavorites: boolean = false;
  note!: number;
  poster: string = '';
  releaseDate: number | undefined;
  title!: string;
}
