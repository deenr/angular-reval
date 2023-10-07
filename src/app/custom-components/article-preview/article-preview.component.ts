import {Component, Input, OnInit} from '@angular/core';
import {SkeletonType} from '@shared/directives/skeleton/skeleton-type.enum';
import {ArticleCategory} from '@shared/enums/article/article-category.enum';
import {ArticleContentType} from '@shared/enums/article/article-content-type.enum';
import {ArticleContent, IntroductionContent, TextContent, ConclusionContent, ImageContent, QuoteContent} from '@shared/models/article/article-content.model';
import {Article} from '@shared/models/article/article.model';
import {User} from '@shared/models/user/user';
import {HttpImageService} from '@shared/services/image/http-image.service';
import {HttpUserService} from '@shared/services/user/http-user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss']
})
export class ArticlePreviewComponent implements OnInit {
  @Input() public article: Article;
  @Input() public images: {name: string; source: string; file: File}[];
  @Input() public loadingArticle = false;
  public skeletonType = SkeletonType;

  private authors: User[];
  private loadedImages: {name: string; source: string}[] = [];

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

  public constructor(private readonly imageService: HttpImageService, private readonly userService: HttpUserService) {}

  public ngOnInit(): void {
    this.images?.forEach((image: {name: string; source: string; file: File}) => {
      if (image.source) {
        this.loadedImages.push({name: image.name, source: image.source});
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          this.loadedImages.push({name: image.name, source: reader.result as string});
          return;
        };
        reader.readAsDataURL(image.file);
      }
    });

    this.userService.getAll().subscribe((authors: User[]) => (this.authors = authors));
  }

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
    const imageContent = content as ImageContent;
    return this.images === undefined ? this.imageService.getImageUrl(imageContent.name) : this.loadedImages.find((image: {name: string; source: string}) => imageContent.name === image.name)?.source;
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
    const author = this.authors.find((author: User) => author.id === (content as QuoteContent).authorId);
    return `${author.firstName} ${author.lastName}`;
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
