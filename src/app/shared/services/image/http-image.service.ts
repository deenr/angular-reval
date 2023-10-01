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

  public uploadImage(file: File) {
    return new Promise<string>((resolve, reject) => {
      this.supabase.storage
        .from('images')
        .upload(file.name, file)
        .then((value: {data: {path: string}; error: null} | {data: null; error: RangeError}) => {
          if (value.error) {
            reject(value.error.message);
          }

          resolve(value.data.path);
        })
        .catch(() => reject());
    });
  }
}
