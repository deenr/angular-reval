import {Injectable} from '@angular/core';
import {SupabaseClient, createClient} from '@supabase/supabase-js';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpImageService {
  private supabase: SupabaseClient;

  public constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  public uploadImage(image: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
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
    });
  }

  public uploadImages(images: File[]): Promise<string[]> {
    const uploadPromises: Promise<string>[] = [];

    images.forEach((image: File) => {
      const uploadPromise = new Promise<string>((resolve, reject) => {
        this.supabase.storage
          .from('sphience-article-images')
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
      });

      uploadPromises.push(uploadPromise);
    });

    return Promise.all(uploadPromises);
  }

  public getImage(name: string): string {
    return this.supabase.storage.from('sphience-article-images').getPublicUrl(name).data.publicUrl;
  }
}
