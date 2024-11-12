import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class HttpImageService {
  private supabase: SupabaseClient;
  private readonly BUCKET_NAME = 'sphience-article-images';

  constructor() {
    this.supabase = createClient(process.env['SUPABASE_URL'], process.env['SUPABASE_KEY']);
  }

  private async checkImageExists(imageName: string): Promise<string | null> {
    try {
      const { data, error } = await this.supabase.storage.from(this.BUCKET_NAME).list('', {
        limit: 1,
        offset: 0,
        search: imageName
      });

      if (error) {
        throw error;
      }

      if (data.some((file) => file.name === imageName)) {
        const { data: urlData } = this.supabase.storage.from(this.BUCKET_NAME).getPublicUrl(imageName);
        return urlData.publicUrl;
      }

      return null;
    } catch (error) {
      console.error('Error checking image existence:', error);
      return null;
    }
  }

  public async uploadSingleImage(image: File): Promise<string> {
    try {
      // Check if image exists
      const existingUrl = await this.checkImageExists(image.name);
      if (existingUrl) {
        return existingUrl;
      }

      // Upload new image
      const { data, error } = await this.supabase.storage.from(this.BUCKET_NAME).upload(image.name, image, {
        cacheControl: '3600',
        upsert: false
      });

      if (error) {
        throw error;
      }

      const { data: urlData } = this.supabase.storage.from(this.BUCKET_NAME).getPublicUrl(data.path);

      return urlData.publicUrl;
    } catch (error) {
      throw new Error(`Image upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  public async uploadMultipleImages(images: File[]): Promise<string[]> {
    if (!images?.length) {
      return [];
    }

    try {
      const uploadPromises = images.map(async (image) => {
        try {
          // Check if image exists
          const existingUrl = await this.checkImageExists(image.name);
          if (existingUrl) {
            return existingUrl;
          }

          // Upload new image
          const { data, error } = await this.supabase.storage.from(this.BUCKET_NAME).upload(image.name, image, {
            cacheControl: '3600',
            upsert: false
          });

          if (error) {
            throw error;
          }

          const { data: urlData } = this.supabase.storage.from(this.BUCKET_NAME).getPublicUrl(data.path);

          return urlData.publicUrl;
        } catch (error) {
          console.error(`Failed to upload ${image.name}:`, error);
          throw error;
        }
      });

      return await Promise.all(uploadPromises);
    } catch (error) {
      throw new Error(`Batch upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  public getImageUrl(imageName: string): string {
    const { data } = this.supabase.storage.from(this.BUCKET_NAME).getPublicUrl(imageName);

    return data.publicUrl;
  }
}
