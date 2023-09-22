import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {SkeletonType} from '@shared/directives/skeleton/skeleton-type.enum';
import {ArticleCategory} from '@shared/enums/article/article-category.enum';
import {ArticleContentType} from '@shared/enums/article/article-content-type.enum';
import {ArticleContent, IntroductionContent, TextContent, ConclusionContent} from '@shared/models/article/article-content.model';
import {Article} from '@shared/models/article/article.model';
import {User} from '@shared/models/user/user';

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
    author: FormControl<User>;
    categories: FormControl<ArticleCategory[]>;
    published: FormControl<Date>;
    content: FormArray<any>;
  }>;
  @Input() public authors: User[];
  @Input() public loadingArticle: boolean;

  public skeletonType = SkeletonType;

  public getTitle(content: ArticleContent): string {
    return (content as IntroductionContent | TextContent | ConclusionContent).title;
  }
}
