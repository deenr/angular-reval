import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public readonly KEY_PREFIX = 'sphience.';

  private readonly window: Window;

  public constructor(@Inject(DOCUMENT) private document: Document) {
    if (document.defaultView) {
      this.window = document.defaultView;
    } else {
      throw new Error('window is not available');
    }
  }

  public setItem(key: string, value: string): void {
    this.window.localStorage.setItem(this.KEY_PREFIX + key, value);
  }

  public getItem(key: string): string | null {
    return this.window.localStorage.getItem(this.KEY_PREFIX + key);
  }

  public clear(): void {
    this.window.localStorage.clear();
  }

  public removeItem(key: string): void {
    this.window.localStorage.removeItem(this.KEY_PREFIX + key);
  }
}
