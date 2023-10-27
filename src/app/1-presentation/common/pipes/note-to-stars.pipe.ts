import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noteToStars',
})
export class NoteToStarsPipe implements PipeTransform {
  transform(note: number): string {
    const starsNumberToDisplay: number = Math.round(note);

    let result: string = '';

    for (let index = 0; index < starsNumberToDisplay; index++) {
      result += `<i class="fas fa-star star-icon"></i>`;
    }

    result += `(${note})`;

    return result;
  }
}
