import {Injectable} from '@angular/core';
import {PostgrestSingleResponse, SupabaseClient, createClient} from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class HttpImageService {
  private supabase: SupabaseClient;

  public constructor() {
    this.supabase = createClient( process.env['SUPABASE_URL'],  process.env['SUPABASE_KEY']);
  }

  public uploadImage(image: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!this.getImageUrl(image.name)) {
        this.supabase.storage
          .from('images')
          .upload(image.name, image, {
            cacheControl: '3600',
            upsert: false
          })
          .then((value: {data: {path: string}; error: null} | {data: null; error: RangeError}) => {
            if (value.error) {
              reject(value.error.message);
            }

            resolve(value.data.path);
          })
          .catch(() => reject());
      } else {
        resolve(image.name);
      }
    });
  }

  public uploadImages(images: File[]): Promise<string[]> {
    const uploadPromises: Promise<string>[] = [];

    images?.forEach((image: File) => {
      const uploadPromise = new Promise<string>((resolve, reject) => {
        if (!this.getImageUrl(image.name)) {
          this.supabase.storage
            .from('images')
            .upload(image.name, image, {
              cacheControl: '3600',
              upsert: false
            })
            .then((value: {data: {path: string}; error: null} | {data: null; error: RangeError}) => {
              if (value.error) {
                reject(value.error.message);
              }

              resolve(value.data.path);
            })
            .catch(() => reject());
        } else {
          resolve(image.name);
        }
      });

      uploadPromises.push(uploadPromise);
    });

    return Promise.all(uploadPromises);
  }

  public getImageUrl(name: string): string {
    return this.supabase.storage.from('sphience-article-images').getPublicUrl(name).data.publicUrl;
  }
}
