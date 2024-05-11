import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datepipe',
  standalone: true
})
export class DatepipePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    let date = new Date(value).toLocaleDateString("hu-HU");
    return date;
  }

}
