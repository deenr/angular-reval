import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ArticleOverview} from '@shared/models/article/article-overview.model';
import {Article} from '@shared/models/article/article.model';
import {articles} from './mock-articles';

@Injectable({
  providedIn: 'root'
})
export class StubArticleService {
  public getOverview(): Observable<ArticleOverview[]> {
    return of(articles?.map((articleJSON: any) => ArticleOverview.fromJSON(articleJSON)));
  }

  public getAll(): Observable<Article[]> {
    return of(articles?.map((articleJSON: any) => Article.fromJSON(articleJSON)));
  }

  public getArticleById(id: string): Observable<Article> {
    return of(articles?.map((articleJSON: any) => Article.fromJSON(articleJSON)).find((article: Article) => article.id === id));
  }
}
