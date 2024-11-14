import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { SupabaseService } from '../supabase.service';
import { Images } from './images.interface';

@Injectable({
  providedIn: 'root'
})
export class SupabaseImagesService extends SupabaseService implements Images {
  private readonly BUCKET_NAME = 'sphience-article-images';

  public uploadSingleImage(image: File): Observable<string> {
    return from(
      this.supabase.storage.from(this.BUCKET_NAME).upload(image.name, image, {
        cacheControl: '3600',
        upsert: false
      })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return this.supabase.storage.from(this.BUCKET_NAME).getPublicUrl(data.path);
      }),
      map(({ data }) => data.publicUrl)
    );
  }

  public uploadMultipleImages(images: File[]): Observable<string[]> {
    return from(
      Promise.all(
        images.map(async (image) => {
          try {
            const { data, error } = await this.supabase.storage.from(this.BUCKET_NAME).upload(image.name, image, {
              cacheControl: '3600',
              upsert: false
            });
            if (error) throw error;
            const { data: urlData } = await this.supabase.storage.from(this.BUCKET_NAME).getPublicUrl(data.path);
            return urlData.publicUrl;
          } catch (error) {
            console.error(`Failed to upload ${image.name}:`, error);
            throw error;
          }
        })
      )
    ).pipe(map((urls) => urls));
  }

  public getPublicImageUrl(imageName: string): string {
    const { data } = this.supabase.storage.from(this.BUCKET_NAME).getPublicUrl(imageName);

    return data.publicUrl;
  }
}
