import {Component, OnInit} from '@angular/core';
import {SkeletonType} from '@shared/directives/skeleton/skeleton-type.enum';
import {ArticleCategory} from '@shared/enums/article/article-category.enum';
import {ArticleOverview} from '@shared/models/article/article-overview.model';
import {StubArticleOverview} from '@shared/models/article/stub-article-overview';
import {HttpArticleService} from '@shared/services/article/http-article.service';
import * as moment from 'moment';

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

  public constructor(private readonly articleService: HttpArticleService) {}

  public ngOnInit(): void {
    this.getArticles();
  }

  public getDate(date: Date): string {
    return moment(date).format('D MMMM YYYY');
  }

  public getImageSource(image: string): string {
    return `../../../assets/image/${image}.webp`;
  }

  public getCategoryTranslation(category: ArticleCategory): string {
    return this.categoryTranslation.get(category);
  }

  private getArticles(): void {
    this.loadingArticles = true;
    this.mainArticle = StubArticleOverview.getEmptyArticleOverview();
    this.otherArticles = [...Array(9).keys()].map((index: number) => StubArticleOverview.getEmptyArticleOverviewWithId(`${index}`));
    this.articleService.getOverview().subscribe((news: ArticleOverview[]) => {
      if (news) {
        this.mainArticle = news?.shift();
        this.otherArticles = news;
        this.loadingArticles = false;
      }
    });
  }
}
