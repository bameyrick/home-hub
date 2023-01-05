import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined, TimeUnit, unitToMS } from '@qntm-code/utils';

@Pipe({
  name: 'milliseconds',
})
export class MillisecondsPipe implements PipeTransform {
  public transform(milliseconds?: number): string | undefined {
    if (!isNullOrUndefined(milliseconds)) {
      const result: string[] = [];

      const days = Math.floor(milliseconds / unitToMS(1, TimeUnit.Days));

      if (days) {
        result.push(`${days} Days`);
      }

      const hours = Math.floor((milliseconds - unitToMS(days, TimeUnit.Days)) / unitToMS(1, TimeUnit.Hours));

      if (hours) {
        result.push(`${hours} Hours`);
      }

      const minutes = Math.floor(
        (milliseconds - unitToMS(days, TimeUnit.Days) - unitToMS(hours, TimeUnit.Hours)) / unitToMS(1, TimeUnit.Minutes)
      );

      if (minutes) {
        result.push(`${minutes} Minutes`);
      }

      const seconds = Math.floor(
        (milliseconds - unitToMS(days, TimeUnit.Days) - unitToMS(hours, TimeUnit.Hours) - unitToMS(minutes, TimeUnit.Minutes)) /
          unitToMS(1, TimeUnit.Minutes)
      );

      if (seconds) {
        result.push(`${seconds} Seconds`);
      }

      return result.join(' ');
    }

    return;
  }
}
