import {Injectable} from '@angular/core';
import {Observable, delay, of} from 'rxjs';
import {articles} from './mock-articles';
import {ArticleOverview} from '@shared/models/article/article-overview.model';
import {Article} from '@shared/models/article/article.model';

@Injectable({
  providedIn: 'root'
})
export class HttpArticleService {
  public getOverview(): Observable<ArticleOverview[]> {
    return of(articles.map((articleJSON: any) => ArticleOverview.fromJSON(articleJSON))).pipe(delay(2000));
  }

  public getAll(): Observable<Article[]> {
    return of(articles.map((articleJSON: any) => Article.fromJSON(articleJSON)));
  }

  public getArticleById(id: string): Observable<Article> {
    return of(Article.fromJSON(articles.find((articleJSON: any) => articleJSON.id === id)));
  }
}
