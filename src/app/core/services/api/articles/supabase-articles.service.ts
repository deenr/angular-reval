import { Injectable } from '@angular/core';
import { Article, ArticleOverview } from '@shared/models/article/interfaces/article.interface';
import { parseArticleContent } from '@shared/models/article/utils/article-content.utils';
import { Observable, combineLatest, from, map } from 'rxjs';
import { SupabaseService } from '../supabase.service';
import { Articles } from './articles.interface';
import { ArticleDTO, ArticleOverviewDTO, AuthorDTO } from './dto/articles.dto';

@Injectable({
  providedIn: 'root'
})
export class SupabaseArticlesService extends SupabaseService implements Articles {
  public getOverview(): Observable<ArticleOverview[]> {
    return from(
      this.supabase
        .from('articles')
        .select(
          `
          id,
          title,
          subtitle,
          inserted_at,
          categories,
          image,
          author:users(id,firstName,lastName,email)
        `
        )
        .then(({ data }: { data: ArticleOverviewDTO[] }) => {
          return data?.map((articleDTO: ArticleOverviewDTO) => {
            const { id, title, subtitle, inserted_at, categories, image, author } = articleDTO;

            return { id, title, subtitle, author: author, published: inserted_at, categories, image } as ArticleOverview;
          });
        })
    );
  }

  public getAll(): Observable<Article[]> {
    return combineLatest([
      from(
        this.supabase.from('articles').select(
          `
            id,
            title,
            subtitle,
            inserted_at,
            categories,
            image,
            author:users(id,firstName,lastName,email),
            content
          `
        )
      ),
      from(
        this.supabase.from('users').select(
          `
            id,
            firstName,
            lastName,
            email
          `
        )
      )
    ]).pipe(
      map(([articles, authors]: [{ data: ArticleDTO[] }, { data: AuthorDTO[] }]) => {
        return articles.data?.map((articleDTO: ArticleDTO) => {
          const { id, title, subtitle, inserted_at, categories, image, author, content } = articleDTO;

          return { id, title, subtitle, author: author, published: inserted_at, categories, image, content: parseArticleContent(content, authors.data) } as Article;
        });
      })
    );
  }

  public getById(id: string): Observable<Article> {
    return combineLatest([
      from(
        this.supabase
          .from('articles')
          .select(
            `
          id,
          title,
          subtitle,
          inserted_at,
          categories,
          image,
          author:users(id,firstName,lastName,email),
          content
        `
          )
          .eq('id', id)
          .single()
      ),
      from(
        this.supabase.from('users').select(
          `
            id,
            firstName,
            lastName,
            email
          `
        )
      )
    ]).pipe(
      map(([article, authors]: [{ data: ArticleDTO }, { data: AuthorDTO[] }]) => {
        const { id, title, subtitle, inserted_at, categories, image, author, content } = article.data;

        return { id, title, subtitle, author, published: inserted_at, categories, image, content: parseArticleContent(content, authors.data) } as Article;
      })
    );
  }

  public add(article: Article): Observable<string> {
    return new Observable<string>((observer) => {
      this.supabase
        .from('articles')
        .insert({
          id: article.title.split(' ').slice(0, 3).join('-').toLowerCase(),
          title: article.title,
          subtitle: article.subtitle,
          author: article.author.id,
          published: article.published,
          categories: article.categories,
          image: article.image,
          content: article.content
        })
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
        .update({
          title: article.title,
          subtitle: article.subtitle,
          author: article.author.id,
          published: article.published,
          categories: article.categories,
          image: article.image,
          content: article.content
        })
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
