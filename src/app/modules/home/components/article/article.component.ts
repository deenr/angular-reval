import { Component, Inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ARTICLES, Articles } from '@core/services/api/articles/articles.interface';
import { IMAGES, Images } from '@core/services/api/images/images.interface';
import { ArticleContentType } from '@shared/models/article/enums/article-content-type.enum';
import { ImageContent } from '@shared/models/article/interfaces/article-content.interface';
import { Article } from '@shared/models/article/interfaces/article.interface';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  public loadingArticle = signal(false);
  public article = signal<Article>(null);
  public images = signal<{ name: string; source: string }[]>([]);

  public constructor(
    @Inject(ARTICLES) private readonly articlesService: Articles,
    @Inject(IMAGES) private readonly imagesService: Images,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  public ngOnInit() {
    this.getArticle();
  }

  private getArticle(): void {
    this.loadingArticle.set(true);

    this.article.set({ id: '', title: '', subtitle: '', author: { id: '', firstName: '', lastName: '', email: '' }, published: new Date(), categories: [], image: '', content: [] });

    this.articlesService
      .getById(this.route.snapshot.paramMap.get('id'))
      .pipe(
        take(1),
        finalize(() => this.loadingArticle.set(false))
      )
      .subscribe({
        next: (article: Article) => this.setArticle(article),
        error: () => this.router.navigate(['news'])
      });
  }

  private setArticle(article: Article): void {
    this.article.set(article);

    const images = [article.image, ...article.content.filter((content) => content.type === ArticleContentType.IMAGE).map((content) => (content as ImageContent).name)].map((image) => ({
      name: image,
      source: this.imagesService.getPublicImageUrl(image)
    }));
    this.images.set(images);
  }
}
