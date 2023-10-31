export class MovieToDisplay {
  public id!: number;
  public isInFavorites: boolean = false;
  public note!: number;
  public poster: string = '';
  public releaseDate: number | undefined;
  public title!: string;
}
