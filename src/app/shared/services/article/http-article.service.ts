import {Injectable} from '@angular/core';
import {Observable, from} from 'rxjs';
import {ArticleOverview} from '@shared/models/article/article-overview.model';
import {Article} from '@shared/models/article/article.model';
import {SupabaseService} from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class HttpArticleService {
  public constructor(private readonly supabaseService: SupabaseService) {}

  public getOverview(): Observable<ArticleOverview[]> {
    return from(
      this.supabaseService.supabase
        .from('articles')
        .select('*')
        .then(({data}) => data?.map((articleJSON: any) => ArticleOverview.fromJSON(articleJSON)))
    );
  }

  public getAll(): Observable<Article[]> {
    return from(
      this.supabaseService.supabase
        .from('articles')
        .select('*')
        .then(({data}) => data?.map((articleJSON: any) => Article.fromJSON(articleJSON)))
    );
  }

  public getArticleById(id: string): Observable<Article> {
    return from(
      this.supabaseService.supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single()
        .then(({data}) => Article.fromJSON(data))
    );
  }
}
