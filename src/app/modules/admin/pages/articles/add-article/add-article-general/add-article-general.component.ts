import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SkeletonType } from '@shared/directives/skeleton/skeleton-type.enum';
import { ArticleCategory } from '@shared/models/article/enums/article-category.enum';
import { ArticleContent, ConclusionContent, IntroductionContent, TextContent } from '@shared/models/article/interfaces/article-content.interface';
import { Author } from '@shared/models/article/interfaces/article.interface';

@Component({
  selector: 'app-add-article-general',
  templateUrl: './add-article-general.component.html',
  styleUrls: ['./add-article-general.component.scss']
})
export class AddArticleGeneralComponent {
  @Input() public isMobile: boolean;
  @Input() public articleForm: FormGroup<{
    title: FormControl<string>;
    subtitle: FormControl<string>;
    authorId: FormControl<string>;
    categories: FormControl<ArticleCategory[]>;
    published: FormControl<Date>;
  }>;
  @Input() public authors: Author[];
  @Input() public loadingArticle: boolean;

  public readonly categories = [
    ArticleCategory.RESEARCH_TOOLS,
    ArticleCategory.APPLICATION_DEVELOPMENT,
    ArticleCategory.TEAM_UPDATES,
    ArticleCategory.COMPANY_NEWS,
    ArticleCategory.FUTURE_PLANS,
    ArticleCategory.INNOVATION,
    ArticleCategory.AWARDS,
    ArticleCategory.INNOVATIONS,
    ArticleCategory.COLLABORATION,
    ArticleCategory.PRODUCT_UPDATES,
    ArticleCategory.GLOBAL_EXPANSION,
    ArticleCategory.DATA_ANALYSIS,
    ArticleCategory.RESEARCH_PARTNERSHIPS,
    ArticleCategory.USER_EXPERIENCE,
    ArticleCategory.APPLICATION_DESIGN
  ];

  public SkeletonType = SkeletonType;

  public getTitle(content: ArticleContent): string {
    return (content as IntroductionContent | TextContent | ConclusionContent).title;
  }

  public getArticleCategoryTranslationKey(articleCategory: ArticleCategory): string {
    return `ARTICLE_CATEGORY.${articleCategory}`;
  }
}
