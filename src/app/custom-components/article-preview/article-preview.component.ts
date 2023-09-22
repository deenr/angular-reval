import {Component, Input} from '@angular/core';
import {SkeletonType} from '@shared/directives/skeleton/skeleton-type.enum';
import {ArticleCategory} from '@shared/enums/article/article-category.enum';
import {ArticleContentType} from '@shared/enums/article/article-content-type.enum';
import {ArticleContent, IntroductionContent, TextContent, ConclusionContent, ImageContent, QuoteContent} from '@shared/models/article/article-content.model';
import {Article} from '@shared/models/article/article.model';
import * as moment from 'moment';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss']
})
export class ArticlePreviewComponent {
  @Input() public article: Article;
  @Input() public loadingArticle = false;
  public skeletonType = SkeletonType;

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

  public isContentIntroduction(articleContentType: ArticleContentType): boolean {
    return articleContentType === ArticleContentType.INTRODUCTION;
  }

  public getText(content: ArticleContent): string[] {
    return (content as IntroductionContent | TextContent | ConclusionContent).text;
  }

  public isContentImage(articleContentType: ArticleContentType): boolean {
    return articleContentType === ArticleContentType.IMAGE;
  }

  public getImageSource(content: ArticleContent): string {
    return `../../../assets/image/${(content as ImageContent).source}.webp`;
  }

  public isContentText(articleContentType: ArticleContentType): boolean {
    return articleContentType === ArticleContentType.TEXT;
  }

  public isContentQuote(articleContentType: ArticleContentType): boolean {
    return articleContentType === ArticleContentType.QUOTE;
  }

  public getQuoteText(content: ArticleContent): string {
    return (content as QuoteContent).quote;
  }

  public getQuoteAuthor(content: ArticleContent): string {
    return (content as QuoteContent).author;
  }

  public isContentConclusion(articleContentType: ArticleContentType): boolean {
    return articleContentType === ArticleContentType.CONCLUSION;
  }

  public getDate(date: Date): string {
    return moment(date).format('D MMMM YYYY');
  }

  public getCategoryTranslation(category: ArticleCategory): string {
    return this.categoryTranslation.get(category);
  }
}
