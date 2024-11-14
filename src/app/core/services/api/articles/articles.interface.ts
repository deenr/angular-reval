import { InjectionToken } from '@angular/core';
import { Article, ArticleOverview } from '@shared/models/article/interfaces/article.interface';
import { Observable } from 'rxjs';

export const ARTICLES = new InjectionToken<Articles>('Articles');

export interface Articles {
  getOverview(): Observable<ArticleOverview[]>;
  getAll(): Observable<Article[]>;
  getById(id: string): Observable<Article>;
  add(article: any): Observable<string>;
  update(article: any): Observable<string>;
  delete(id: string): Observable<string>;
}
