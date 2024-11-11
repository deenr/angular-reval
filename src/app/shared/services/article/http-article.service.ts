import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { ArticleOverview } from '@shared/models/article/article-overview.model';
import { Article } from '@shared/models/article/article.model';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class HttpArticleService {
  private supabase: SupabaseClient;

  public constructor() {
    this.supabase = createClient(process.env['SUPABASE_URL'], process.env['SUPABASE_KEY']);
  }

  public getOverview(): Observable<ArticleOverview[]> {
    return from(
      this.supabase
        .from('articles')
        .select(
          `
          *,
          author:users(*)
        `
        )
        .then(({ data }) => data?.map((articleJSON: any) => ArticleOverview.fromJSON(articleJSON)))
    );
  }

  public getAll(): Observable<Article[]> {
    return from(
      this.supabase
        .from('articles')
        .select(
          `
          *,
          author:users(*)
        `
        )
        .then(({ data }) => data?.map((articleJSON: any) => Article.fromJSON(articleJSON)))
    );
  }

  public getById(id: string): Observable<Article> {
    return from(
      this.supabase
        .from('articles')
        .select(
          `
          *,
          author:users(*)
        `
        )
        .eq('id', id)
        .single()
        .then(({ data }) => Article.fromJSON(data))
    );
  }

  public add(article: Article): Observable<string> {
    return new Observable<string>((observer) => {
      this.supabase
        .from('articles')
        .upsert(article.toJSON())
        .then((response) => {
          if (response.error) {
            observer.error(response.error);
          } else {
            observer.next();
            observer.complete();
          }
        });
    });
  }

  public update(article: Article): Observable<string> {
    return new Observable<string>((observer) => {
      this.supabase
        .from('articles')
        .update(article.toJSON())
        .eq('id', article.id)
        .then((response) => {
          if (response.error) {
            observer.error(response.error);
          } else {
            observer.next();
            observer.complete();
          }
        });
    });
  }

  public delete(id: string): Observable<string> {
    return new Observable<string>((observer) => {
      this.supabase
        .from('articles')
        .delete()
        .eq('id', id)
        .then((response) => {
          if (response.error) {
            observer.error(response.error);
          } else {
            observer.next(id);
            observer.complete();
          }
        });
    });
  }
}
