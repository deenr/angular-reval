import { Component, OnInit } from '@angular/core';
import { HttpArticleService } from '@core/services/article/http-article.service';
import { HttpImageService } from '@core/services/image/http-image.service';
import { ArticleCategory } from '@shared/enums/article/article-category.enum';
import { ArticleOverview } from '@shared/models/article/article-overview.model';
import { StubArticleOverview } from '@shared/models/article/stub-article-overview';
import * as moment from 'moment';
import { SkeletonType } from 'src/app/shared/directives/skeleton/skeleton-type.enum';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  public mainArticle: ArticleOverview;
  public otherArticles: ArticleOverview[];
  public skeletonType = SkeletonType;

  public loadingArticles = true;

  private categoryTranslation = new Map<ArticleCategory, string>([
    [ArticleCategory.RESEARCH_TOOLS, 'Tools'],
    [ArticleCategory.APPLICATION_DEVELOPMENT, 'Development'],
    [ArticleCategory.TEAM_UPDATES, 'Team updates'],
    [ArticleCategory.COMPANY_NEWS, 'Company news'],
    [ArticleCategory.FUTURE_PLANS, 'Future plans'],
    [ArticleCategory.INNOVATION, 'Innovation'],
    [ArticleCategory.AWARDS, 'Awards'],
    [ArticleCategory.INNOVATIONS, 'Innovations'],
    [ArticleCategory.COLLABORATION, 'Collaboration'],
    [ArticleCategory.PRODUCT_UPDATES, 'Product updates'],
    [ArticleCategory.GLOBAL_EXPANSION, 'Global expension'],
    [ArticleCategory.DATA_ANALYSIS, 'Data analysis'],
    [ArticleCategory.RESEARCH_PARTNERSHIPS, 'Research partnerships'],
    [ArticleCategory.USER_EXPERIENCE, 'User experience'],
    [ArticleCategory.APPLICATION_DESIGN, 'Application design']
  ]);

  public constructor(private readonly articleService: HttpArticleService, private readonly imageService: HttpImageService) {}

  public ngOnInit(): void {
    this.getArticles();
  }

  public getDate(date: Date): string {
    return moment(date).format('D MMMM YYYY');
  }

  public getImageSource(image: string): string {
    return this.imageService.getImageUrl(image);
  }

  public getCategoryTranslation(category: ArticleCategory): string {
    return this.categoryTranslation.get(category);
  }

  private getArticles(): void {
    this.loadingArticles = true;

    this.mainArticle = StubArticleOverview.getEmptyArticleOverview();
    this.otherArticles = [...Array(9).keys()].map((index: number) => StubArticleOverview.getEmptyArticleOverviewWithId(`${index}`));

    this.articleService.getOverview().subscribe((articles: ArticleOverview[]) => {
      if (articles) {
        this.mainArticle = articles?.shift();
        this.otherArticles = articles;
        this.loadingArticles = false;
      }
    });
  }
}
