import {Component, Input, OnInit} from '@angular/core';
import {COMMA} from '@angular/cdk/keycodes';
import {FormControl, FormGroup} from '@angular/forms';
import {SkeletonType} from '@shared/directives/skeleton/skeleton-type.enum';
import {ArticleCategory} from '@shared/enums/article/article-category.enum';
import {ArticleContent, IntroductionContent, TextContent, ConclusionContent} from '@shared/models/article/article-content.model';
import {User} from '@shared/models/user/user';
import {Observable, map, startWith} from 'rxjs';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({
  selector: 'app-add-article-general',
  templateUrl: './add-article-general.component.html',
  styleUrls: ['./add-article-general.component.scss']
})
export class AddArticleGeneralComponent implements OnInit {
  @Input() public isMobile: boolean;
  @Input() public articleForm: FormGroup<{
    title: FormControl<string>;
    subtitle: FormControl<string>;
    author: FormControl<User>;
    categories: FormControl<ArticleCategory[]>;
    published: FormControl<Date>;
  }>;
  @Input() public authors: User[];
  @Input() public loadingArticle: boolean;

  public ngOnInit(): void {
    const title = this.articleForm.value.title;
    const subtitle = this.articleForm.value.subtitle;

    setTimeout(() => {
      this.articleForm.controls.title.setValue(`${title} .`);
      this.articleForm.controls.subtitle.setValue(`${subtitle} .`);

      setTimeout(() => {
        this.articleForm.controls.subtitle.setValue(`${subtitle}`);
        this.articleForm.controls.title.setValue(`${title}`);
      }, 100);
    });
  }

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

  public skeletonType = SkeletonType;

  public getTitle(content: ArticleContent): string {
    return (content as IntroductionContent | TextContent | ConclusionContent).title;
  }

  public getArticleCategoryTranslationKey(articleCategory: ArticleCategory): string {
    return `ARTICLE_CATEGORY.${articleCategory}`;
  }
}
