import {Injectable, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ArticleOverview} from '@shared/models/article/article-overview.model';
import {Article} from '@shared/models/article/article.model';
import {articles as articlesJSON} from './mock-articles';
import {StubUser} from '@shared/models/user/stub-user';
import {StubUserService} from '../user/stub-user.service';
import {ArticleContent, QuoteContent} from '@shared/models/article/article-content.model';
import {ArticleContentType} from '@shared/enums/article/article-content-type.enum';

@Injectable({
  providedIn: 'root'
})
export class StubArticleService {
  private articles: Article[];

  public constructor(private readonly userService: StubUserService) {
    const articles = articlesJSON?.map((articleJSON: any) => Article.fromJSON(articleJSON));
    this.articles = articles.map((article: Article) => {
      const users = userService.users;
      article.author = users[Math.floor(Math.random() * users.length)];

      article.content = article.content.map((articleContent: ArticleContent) => {
        if (articleContent instanceof QuoteContent) {
          articleContent.author = users[Math.floor(Math.random() * users.length)];
        }
        return articleContent;
      });

      return article;
    });
  }

  public getOverview(): Observable<ArticleOverview[]> {
    return of(this.articles.map((article: Article) => ArticleOverview.fromArticle(article)));
  }

  public getAll(): Observable<Article[]> {
    return of(this.articles);
  }

  public getById(id: string): Observable<Article> {
    return of(this.articles.find((article: Article) => article.id === id));
  }

  public add(newArticle: Article): Observable<string> {
    this.articles.push(newArticle);

    return of(newArticle.id);
  }

  public update(newArticle: Article): Observable<string> {
    this.articles = this.articles.map((article: Article) => (article.id === newArticle.id ? newArticle : article));
    return of(newArticle.id);
  }
}
