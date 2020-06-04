import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({ name: 'momentFormat' })
export class MomentFormatPipe implements PipeTransform {
  transform(value: Date, format: string) {
    const date = moment(value);
    if (date.isValid()) {
      return date.format(format);
    }
    return null;
  }
}
