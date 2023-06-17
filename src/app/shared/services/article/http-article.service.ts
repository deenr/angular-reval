import {Injectable} from '@angular/core';
import {Article} from '@shared/models/article.model';
import {Observable, delay, of} from 'rxjs';
import {articles} from './mock-articles';
import {ArticleOverview} from '@shared/models/article-overview.model';

@Injectable({
  providedIn: 'root'
})
export class HttpArticleService {
  public getOverview(): Observable<ArticleOverview[]> {
    return of(articles.map((articleJSON: any) => ArticleOverview.fromJSON(articleJSON)));
  }

  public getAll(): Observable<Article[]> {
    return of(articles.map((articleJSON: any) => Article.fromJSON(articleJSON)));
  }

  public getArticleById(id: string): Observable<Article> {
    return of(Article.fromJSON(articles.find((articleJSON: any) => articleJSON.id === id)));
  }
}
