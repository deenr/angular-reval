import { Component, Inject, OnInit } from '@angular/core';
import { ARTICLES, Articles } from '@core/services/api/articles/articles.interface';
import { Images, IMAGES } from '@core/services/api/images/images.interface';
import { ArticleCategory } from '@shared/models/article/enums/article-category.enum';
import { ArticleOverview } from '@shared/models/article/interfaces/article.interface';
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

  public constructor(@Inject(ARTICLES) private readonly articlesService: Articles, @Inject(IMAGES) private readonly imagesService: Images) {}

  public ngOnInit(): void {
    this.getArticles();
  }

  public getDate(date: Date): string {
    return moment(date).format('D MMMM YYYY');
  }

  public getImageSource(image: string): string {
    return this.imagesService.getPublicImageUrl(image);
  }

  public getCategoryTranslation(category: ArticleCategory): string {
    return this.categoryTranslation.get(category);
  }

  private getArticles(): void {
    this.loadingArticles = true;

    this.mainArticle = { id: '', title: '', subtitle: '', author: null, published: null, categories: [] } as any;
    this.otherArticles = [...Array(9).keys()].map((index: number) => ({ id: index, title: '', subtitle: '', author: null, published: null, categories: [] } as any));

    this.articlesService.getOverview().subscribe((articles: ArticleOverview[]) => {
      if (articles) {
        this.mainArticle = articles?.shift();
        this.otherArticles = articles;
        this.loadingArticles = false;
      }
    });
  }
}
