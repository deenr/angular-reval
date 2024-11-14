import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const IMAGES = new InjectionToken<Images>('Images');

export interface Images {
  uploadSingleImage(image: File): Observable<string>;
  uploadMultipleImages(images: File[]): Observable<string[]>;
  getPublicImageUrl(imageName: string): string;
}
