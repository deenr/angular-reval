import {Injectable} from '@angular/core';
import {Observable, from} from 'rxjs';
import {ArticleOverview} from '@shared/models/article/article-overview.model';
import {Article} from '@shared/models/article/article.model';
import {SupabaseClient, createClient} from '@supabase/supabase-js';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpArticleService {
  private supabase: SupabaseClient;

  public constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  public getOverview(): Observable<ArticleOverview[]> {
    return from(
      this.supabase
        .from('articles')
        .select('*')
        .then(({data}) => data?.map((articleJSON: any) => ArticleOverview.fromJSON(articleJSON)))
    );
  }

  public getAll(): Observable<Article[]> {
    return from(
      this.supabase
        .from('articles')
        .select('*')
        .then(({data}) => data?.map((articleJSON: any) => Article.fromJSON(articleJSON)))
    );
  }

  public getArticleById(id: string): Observable<Article> {
    return from(
      this.supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single()
        .then(({data}) => Article.fromJSON(data))
    );
  }
}
