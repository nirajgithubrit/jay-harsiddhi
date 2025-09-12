import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetter',
  standalone: true,
})
export class FirstLetterPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    const firstLetter = value.trim().split('')[0];
    return firstLetter;
  }
}
