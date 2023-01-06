import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'toParagraphs',
})
export class ToParagraphsPipe implements PipeTransform {
  public transform(value?: string): SafeHtml | undefined {
    return value
      ?.split(`\n`)
      .map(line => `<p>${line}</p>`)
      .join(``);
  }
}
