import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SkeletonDirective } from '@shared/directives/skeleton/skeleton.directive';
import { ArticleCategory } from '@shared/models/article/enums/article-category.enum';
import { ArticleContentType } from '@shared/models/article/enums/article-content-type.enum';
import { ArticleContent, ConclusionContent, ImageContent, IntroductionContent, QuoteContent, TextContent } from '@shared/models/article/interfaces/article-content.interface';
import { Article } from '@shared/models/article/interfaces/article.interface';
import * as moment from 'moment';
import { SkeletonType } from 'src/app/shared/directives/skeleton/skeleton-type.enum';

@Component({
  standalone: true,
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss'],
  imports: [CommonModule, SkeletonDirective]
})
export class ArticlePreviewComponent {
  @Input() public article: Article;
  @Input() public images: { name: string; source: string }[];
  @Input() public loadingArticle = false;

  public skeletonType = SkeletonType;
  public ArticleContentType = ArticleContentType;

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

  public getTitle(content: ArticleContent): string {
    return (content as IntroductionContent | TextContent | ConclusionContent).title;
  }

  public getText(content: ArticleContent): string[] {
    return (content as IntroductionContent | TextContent | ConclusionContent).text;
  }

  public getImageSource(content: ArticleContent): string {
    const imageContent = content as ImageContent;
    return this.images.find((image: { name: string; source: string }) => imageContent.name === image.name)?.source;
  }

  public getQuoteText(content: ArticleContent): string {
    return (content as QuoteContent).quote;
  }

  public getQuoteAuthor(content: ArticleContent): string {
    const { firstName, lastName } = (content as QuoteContent).author;
    return `${firstName} ${lastName}`;
  }

  public getDate(date: Date): string {
    return moment(date).format('D MMMM YYYY');
  }

  public getCategoryTranslation(category: ArticleCategory): string {
    return this.categoryTranslation.get(category);
  }
}
