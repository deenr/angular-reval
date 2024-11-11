import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkeletonType } from '@shared/directives/skeleton/skeleton-type.enum';
import { ArticleCategory } from '@shared/enums/article/article-category.enum';
import { ArticleContentType } from '@shared/enums/article/article-content-type.enum';
import { ArticleContent, ConclusionContent, ImageContent, IntroductionContent, QuoteContent, TextContent } from '@shared/models/article/article-content.model';
import { Article } from '@shared/models/article/article.model';
import { StubArticle } from '@shared/models/article/stub-article';
import { HttpArticleService } from '@shared/services/article/http-article.service';
import { HttpImageService } from '@shared/services/image/http-image.service';
import * as moment from 'moment';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  public loadingArticle = true;
  public article: Article;

  public constructor(private readonly route: ActivatedRoute, private readonly articleService: HttpArticleService) {}

  public ngOnInit() {
    this.getArticle();
  }

  private getArticle(): void {
    this.loadingArticle = true;
    this.article = StubArticle.getEmptyArticle();
    this.articleService.getById(this.route.snapshot.paramMap.get('id')).subscribe((article: Article) => {
      this.article = article;
      this.loadingArticle = false;
    });
  }
}
