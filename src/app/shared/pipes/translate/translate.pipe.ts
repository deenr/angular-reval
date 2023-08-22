import {Pipe, PipeTransform} from '@angular/core';
import * as dictionaryJSON from './dictonary.json';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  public transform(value: string): string {
    const keys = value.split('.');
    let result: any = dictionaryJSON;

    for (const key of keys) {
      result = result[key];
    }

    if (typeof result === 'string') {
      return result;
    } else {
      throw 'Translation not found';
    }
  }
}
