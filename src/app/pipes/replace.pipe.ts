import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace',
})
export class ReplacePipe implements PipeTransform {
  public transform(value: string | null | undefined, searchValue: string | RegExp, replacement: string): string | undefined | null {
    return value?.replace(searchValue, replacement);
  }
}
