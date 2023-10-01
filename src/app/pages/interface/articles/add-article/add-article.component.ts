import {Component, OnInit} from '@angular/core';
import {AddArticleTab} from './add-article-tabs.enum';
import {Tab} from '@custom-components/tabs/tab.interface';
import {StubArticleService} from '@shared/services/article/stub-article.service';
import {ActivatedRoute} from '@angular/router';
import {Article} from '@shared/models/article/article.model';
import {BreakpointService} from '@shared/services/breakpoint/breakpoint.service';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {User} from '@shared/models/user/user';
import {StubUserService} from '@shared/services/user/stub-user.service';
import {ArticleCategory} from '@shared/enums/article/article-category.enum';
import {ArticleContent, ConclusionContent, ImageContent, IntroductionContent, QuoteContent, TextContent} from '@shared/models/article/article-content.model';
import {ArticleContentType} from '@shared/enums/article/article-content-type.enum';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {
  public tabs = [
    {id: AddArticleTab.GENERAL, name: 'General', disabled: false, active: true},
    {id: AddArticleTab.CONTENT, name: 'Content', disabled: false, active: false},
    {id: AddArticleTab.PREVIEW, name: 'Preview', disabled: false, active: false}
  ] as Tab[];

  public articleForm: FormGroup<{
    title: FormControl<string>;
    subtitle: FormControl<string>;
    author: FormControl<User>;
    categories: FormControl<ArticleCategory[]>;
    published: FormControl<Date>;
  }>;

  public contentForm: FormGroup<{
    content: FormArray<
      | FormGroup<{type: FormControl<ArticleContentType.TEXT>; title: FormControl<string>; text: FormControl<string>}>
      | FormGroup<{type: FormControl<ArticleContentType.QUOTE>; quote: FormControl<string>; author: FormControl<User>}>
      | FormGroup<{type: FormControl<ArticleContentType.IMAGE>; source: FormControl<string>}>
    >;
  }>;

  public authors: User[];
  public addArticleTab = AddArticleTab;
  public article: Article;
  public isMobile: boolean;
  public loadingArticle = false;
  public savingArticle = false;

  public constructor(
    private readonly articleService: StubArticleService,
    private readonly userService: StubUserService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly breakpointService: BreakpointService,
    private readonly location: Location
  ) {}

  public ngOnInit(): void {
    this.breakpointService.observe().subscribe(() => (this.isMobile = this.breakpointService.isMobile));

    this.setFormField();

    this.userService.getUsers().subscribe((authors: User[]) => (this.authors = authors));

    if (!this.isAddingArticle()) {
      this.loadingArticle = true;

      this.articleService.getArticleById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe((article: Article) => {
        this.article = article;

        this.setFormFieldValues(article);
      });
    }
  }

  public isTabActive(addArticleTab: AddArticleTab): boolean {
    return this.getActiveTab().id === addArticleTab;
  }

  public getArticleToSave(): Article {
    const content = this.contentForm.value.content.map((content: Partial<TextContentFormGroup | QuoteContentFormGroup | ImageContentFormGroup>, index: number) => {
      if ((content as QuoteContentFormGroup).quote) {
        const quoteContent = content as QuoteContentFormGroup;
        return new QuoteContent(quoteContent.author, quoteContent.quote);
      } else if ((content as ImageContentFormGroup).source) {
        const imageContent = content as ImageContent;
        return new ImageContent(imageContent.source);
      } else {
        const textContent = content as TextContentFormGroup;

        if (index === 0) {
          return new IntroductionContent(textContent.title, textContent.text?.split('\n\n'));
        } else if (index === this.contentForm.value.content.length - 1) {
          return new ConclusionContent(textContent.title, textContent.text?.split('\n\n'));
        } else {
          return new TextContent(textContent.title, textContent.text?.split('\n\n'));
        }
      }
    });

    return new Article(
      this.article?.id,
      this.articleForm.value?.title,
      this.articleForm.value?.subtitle,
      this.articleForm.value?.author,
      this.articleForm.value?.published,
      this.articleForm.value?.categories,
      this.article?.image,
      content
    );
  }

  public saveArticle(): void {
    this.articleForm.markAllAsTouched();
    this.contentForm.markAllAsTouched();

    if (this.articleForm.valid && this.contentForm.valid) {
      this.savingArticle = true;

      const articleToSave = this.getArticleToSave();
      if (this.isAddingArticle()) {
        this.articleService.save(articleToSave).subscribe((id: string) => {
          console.log(id);
          this.location.back();
        });
      } else {
        this.articleService.update(articleToSave).subscribe((id: string) => {
          console.log(id);
          this.location.back();
        });
      }
    }
  }

  public isAddingArticle(): boolean {
    return this.activatedRoute.snapshot.routeConfig.path.includes('add');
  }

  private getActiveTab(): Tab {
    return this.tabs.find((tab: Tab) => tab.active);
  }

  private setFormField(): void {
    this.articleForm = new FormGroup({
      title: new FormControl('', Validators.required),
      subtitle: new FormControl('', Validators.required),
      author: new FormControl(null, Validators.required),
      categories: new FormControl(null, Validators.required),
      published: new FormControl(null, Validators.required)
    });

    this.contentForm = new FormGroup({
      content: new FormArray([])
    });

    if (this.isAddingArticle()) {
      this.contentForm.controls.content.push(
        new FormGroup({
          type: new FormControl(ArticleContentType.TEXT),
          title: new FormControl('', Validators.required),
          text: new FormControl('', Validators.required)
        })
      );

      this.contentForm.controls.content.push(
        new FormGroup({
          type: new FormControl(ArticleContentType.QUOTE),
          quote: new FormControl('', Validators.required),
          author: new FormControl(null, Validators.required)
        })
      );

      // this.contentForm.controls.content.push(
      //   new FormGroup({
      //     type: new FormControl(ArticleContentType.IMAGE),
      //     source: new FormControl('', Validators.required)
      //   })
      // );

      this.contentForm.controls.content.push(
        new FormGroup({
          type: new FormControl(ArticleContentType.TEXT),
          title: new FormControl('', Validators.required),
          text: new FormControl('', Validators.required)
        })
      );
    }
  }

  private setFormFieldValues(article: Article): void {
    this.articleForm.setValue({
      title: article.title,
      subtitle: article.subtitle,
      author: article.author,
      categories: article.categories,
      published: article.published
    });
    this.article.content.forEach((content: ArticleContent) => {
      switch (content.type) {
        case ArticleContentType.INTRODUCTION:
          const introductionContent = content as IntroductionContent;

          this.contentForm.controls.content.push(
            new FormGroup({
              type: new FormControl(ArticleContentType.TEXT),
              title: new FormControl(introductionContent.title, Validators.required),
              text: new FormControl(introductionContent.text.join('\n\n'), Validators.required)
            })
          );
          break;
        case ArticleContentType.TEXT:
          const textContent = content as TextContent;

          this.contentForm.controls.content.push(
            new FormGroup({
              type: new FormControl(ArticleContentType.TEXT),
              title: new FormControl(textContent.title, Validators.required),
              text: new FormControl(textContent.text.join('\n\n'), Validators.required)
            })
          );
          break;
        case ArticleContentType.IMAGE:
          const imageContent = content as ImageContent;

          this.contentForm.controls.content.push(
            new FormGroup({
              type: new FormControl(ArticleContentType.IMAGE),
              source: new FormControl(imageContent.source, Validators.required)
            })
          );
          break;
        case ArticleContentType.QUOTE:
          const qouteContent = content as QuoteContent;

          this.contentForm.controls.content.push(
            new FormGroup({
              type: new FormControl(ArticleContentType.QUOTE),
              quote: new FormControl(qouteContent.quote, Validators.required),
              author: new FormControl(qouteContent.author, Validators.required)
            })
          );

          break;
        case ArticleContentType.CONCLUSION:
          const conclusionContent = content as ConclusionContent;

          this.contentForm.controls.content.push(
            new FormGroup({
              type: new FormControl(ArticleContentType.TEXT),
              title: new FormControl(conclusionContent.title, Validators.required),
              text: new FormControl(conclusionContent.text.join('\n\n'), Validators.required)
            })
          );
          break;
        default:
          break;
      }
    });

    this.loadingArticle = false;
  }
}

export interface TextContentFormGroup {
  type: ArticleContentType;
  title: string;
  text: string;
}

export interface QuoteContentFormGroup {
  type: ArticleContentType;
  quote: string;
  author: User;
}

export interface ImageContentFormGroup {
  type: ArticleContentType;
  source: string;
}
