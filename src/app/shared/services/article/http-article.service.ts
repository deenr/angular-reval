import {Injectable} from '@angular/core';
import {Observable, catchError, from, map, of, throwError} from 'rxjs';
import {ArticleOverview} from '@shared/models/article/article-overview.model';
import {Article} from '@shared/models/article/article.model';
import {supabase} from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class HttpArticleService {
  public getOverview(): Observable<ArticleOverview[]> {
    return from(
      supabase
        .from('articles')
        .select('*')
        .then(({data}) => data?.map((articleJSON: any) => ArticleOverview.fromJSON(articleJSON)))
    );
  }

  public getAll(): Observable<Article[]> {
    return from(
      supabase
        .from('articles')
        .select('*')
        .then(({data}) => data?.map((articleJSON: any) => Article.fromJSON(articleJSON)))
    );
  }

  public getArticleById(id: string): Observable<Article> {
    return from(
      supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single()
        .then(({data}) => Article.fromJSON(data))
    );
  }
}
