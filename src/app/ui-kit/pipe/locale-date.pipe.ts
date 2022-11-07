// create pipe transform date to locale date

import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localeDate',
})
export class LocaleDatePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) public locale: string) {}

  getUsersLocale(defaultValue: string): string {
    if (
      typeof window === 'undefined' ||
      typeof window.navigator === 'undefined'
    ) {
      return defaultValue;
    }
    const wn = window.navigator as any;
    let lang = wn.languages ? wn.languages[0] : defaultValue;
    lang = lang || wn.language || wn.browserLanguage || wn.userLanguage;
    return lang;
  }

  transform(value: number | string): string {
    const date = new Date(value);
    return date.toLocaleDateString(this.getUsersLocale('en-US'), {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
}
