import { Pipe, PipeTransform } from '@angular/core';
import * as dictionaryJSON from '../../../../assets/i18n/en.json';

@Pipe({
  standalone: true,
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  public transform(value: string): string {
    const keys = value.split('.');
    let result: any = dictionaryJSON;

    for (const key of keys) {
      result = result?.[key];
    }

    return typeof result === 'string' ? result : value;
  }
}
