import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  protected readonly supabase: SupabaseClient;

  public constructor() {
    this.supabase = createClient(process.env['SUPABASE_URL'], process.env['SUPABASE_KEY']);
  }
}
