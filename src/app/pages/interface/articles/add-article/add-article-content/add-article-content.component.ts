import {Component, Input} from '@angular/core';
import {FormArray, FormGroup, FormControl} from '@angular/forms';
import {SkeletonType} from '@shared/directives/skeleton/skeleton-type.enum';
import {ArticleContentType} from '@shared/enums/article/article-content-type.enum';
import {User} from '@shared/models/user/user';
import {TextContentFormGroup, QuoteContentFormGroup, ImageContentFormGroup} from '../add-article.component';

@Component({
  selector: 'app-add-article-content',
  templateUrl: './add-article-content.component.html',
  styleUrls: ['./add-article-content.component.scss']
})
export class AddArticleContentComponent {
  @Input() public isMobile: boolean;
  @Input() public authors: User[];
  @Input() public contentForm: FormGroup<{
    content: FormArray<
      | FormGroup<{type: FormControl<ArticleContentType.TEXT>; title: FormControl<string>; text: FormControl<string>}>
      | FormGroup<{type: FormControl<ArticleContentType.QUOTE>; quote: FormControl<string>; author: FormControl<string>}>
      | FormGroup<{type: FormControl<ArticleContentType.IMAGE>; source: FormControl<string>}>
    >;
  }>;

  public skeletonType = SkeletonType;
  public articleContentType = ArticleContentType;

  public isContentText(articleContentType: ArticleContentType): boolean {
    return articleContentType === ArticleContentType.TEXT;
  }

  public isContentQuote(articleContentType: ArticleContentType): boolean {
    return articleContentType === ArticleContentType.QUOTE;
  }

  public isContentImage(articleContentType: ArticleContentType): boolean {
    return articleContentType === ArticleContentType.IMAGE;
  }

  public getHeader(contentControl: ContentFormGroup): string {
    if (contentControl.value.type === ArticleContentType.IMAGE) {
      return 'Image';
    } else if (contentControl.value.type === ArticleContentType.QUOTE) {
      return 'Quote';
    } else {
      const textContent = this.contentForm.value.content.filter((content: Partial<TextContentFormGroup | QuoteContentFormGroup | ImageContentFormGroup>) => content.type === ArticleContentType.TEXT);

      const index = textContent.findIndex((content: Partial<TextContentFormGroup>) => content === contentControl.value);

      if (index === 0) {
        return 'Introduction';
      } else if (index === textContent.length - 1) {
        return 'Conclusion';
      }

      return 'Text';
    }
  }
}

type ContentFormGroup =
  | FormGroup<{type: FormControl<ArticleContentType.TEXT>; title: FormControl<string>; text: FormControl<string>}>
  | FormGroup<{type: FormControl<ArticleContentType.QUOTE>; quote: FormControl<string>; author: FormControl<string>}>
  | FormGroup<{type: FormControl<ArticleContentType.IMAGE>; source: FormControl<string>}>;
