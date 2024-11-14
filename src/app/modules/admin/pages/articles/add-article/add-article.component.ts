import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ARTICLES, Articles } from '@core/services/api/articles/articles.interface';
import { IMAGES, Images } from '@core/services/api/images/images.interface';
import { USERS, Users } from '@core/services/api/users/users.interface';
import { BreakpointService } from '@core/services/breakpoint.service';
import { Tab } from '@shared/components/tabs/tab.interface';
import { ArticleCategory } from '@shared/models/article/enums/article-category.enum';
import { ArticleContentType } from '@shared/models/article/enums/article-content-type.enum';
import { ArticleContent, ConclusionContent, ImageContent, IntroductionContent, QuoteContent, TextContent } from '@shared/models/article/interfaces/article-content.interface';
import { Article, Author } from '@shared/models/article/interfaces/article.interface';
import { UserUnsensitive } from '@shared/models/user/interfaces/user.interface';
import { Observable, combineLatest, finalize, forkJoin, take } from 'rxjs';
import { AddArticleTab } from './add-article-tabs.enum';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {
  public tabs = [
    { id: AddArticleTab.GENERAL, name: 'General', disabled: false, active: true },
    { id: AddArticleTab.CONTENT, name: 'Content', disabled: false, active: false },
    { id: AddArticleTab.PREVIEW, name: 'Preview', disabled: true, active: false }
  ] as Tab[];

  public articleForm: FormGroup<{
    title: FormControl<string>;
    subtitle: FormControl<string>;
    authorId: FormControl<string>;
    categories: FormControl<ArticleCategory[]>;
    published: FormControl<Date>;
  }>;

  public contentForm: FormGroup<{
    content: FormArray<TextContentFormGroup | QuoteContentFormGroup | ImageContentFormGroup>;
  }>;

  public authors: Author[];
  public addArticleTab = AddArticleTab;
  public article: Article;
  public isMobile: boolean;
  public loadingArticle = false;
  public savingArticle = false;

  public constructor(
    @Inject(ARTICLES) private readonly articlesService: Articles,
    @Inject(USERS) private readonly usersService: Users,
    @Inject(IMAGES) private readonly imagesService: Images,
    private readonly activatedRoute: ActivatedRoute,
    private readonly breakpointService: BreakpointService,
    private readonly location: Location
  ) {}

  public ngOnInit(): void {
    this.breakpointService.observe().subscribe(() => (this.isMobile = this.breakpointService.isMobile));

    this.setFormField();

    const requests: (Observable<Article> | Observable<UserUnsensitive[]>)[] = [this.usersService.getAllUnsensitive().pipe(take(1))];

    if (!this.isAddingArticle()) {
      this.loadingArticle = true;

      requests.push(this.articlesService.getById(this.activatedRoute.snapshot.paramMap.get('id')).pipe(take(1)));
    }

    forkJoin(requests).subscribe(([authors, article]: (UserUnsensitive[] | Article)[]) => {
      this.authors = authors as Author[];

      if (article) {
        this.article = article as Article;
        this.setFormFieldValues(this.article);
      }
    });
  }

  public isTabActive(addArticleTab: AddArticleTab): boolean {
    return this.getActiveTab().id === addArticleTab;
  }

  public getArticleToSave(): Article {
    let imageName: string;

    const content = this.contentForm.value.content.map((content: Partial<TextContentFormType | QuoteContentFormType | ImageContentFormType>, index: number) => {
      if ((content as QuoteContentFormType).quote) {
        const quoteContent = content as QuoteContentFormType;

        return {
          type: ArticleContentType.QUOTE,
          author: this.authors.find((author) => author.id === quoteContent.authorId),
          quote: quoteContent.quote
        } as QuoteContent;
      } else if ((content as ImageContentFormType).source) {
        const imageContent = content as ImageContentFormType;
        if (imageName === undefined) {
          imageName = imageContent.name;
        }
        return {
          type: ArticleContentType.IMAGE,
          name: imageContent.name
        } as ImageContent;
      } else {
        const textContent = content as TextContentFormType;

        if (index === 0) {
          return {
            type: ArticleContentType.INTRODUCTION,
            title: textContent.title,
            text: textContent.text?.split('\n\n')
          } as IntroductionContent;
        } else if (index === this.contentForm.value.content.length - 1) {
          return {
            type: ArticleContentType.CONCLUSION,
            title: textContent.title,
            text: textContent.text?.split('\n\n')
          } as ConclusionContent;
        } else {
          return {
            type: ArticleContentType.TEXT,
            title: textContent.title,
            text: textContent.text?.split('\n\n')
          } as TextContent;
        }
      }
    });

    return {
      id:
        this.article?.id ??
        this.articleForm.value?.title
          .split(' ')
          .slice(0, 5)
          .map((value: string) => this.removeNonAlphabetCharacters(value.toLowerCase()))
          .join('-'),
      title: this.articleForm.value.title,
      subtitle: this.articleForm.value.subtitle,
      author: this.authors.find((author) => author.id === this.articleForm.value.authorId),
      published: this.articleForm.value.published,
      categories: this.articleForm.value.categories,
      image: imageName ?? null,
      content: content
    };
  }

  public cancel(): void {
    this.location.back();
  }

  public saveArticle(): void {
    this.articleForm.markAllAsTouched();
    this.contentForm.markAllAsTouched();

    if (this.articleForm.valid && this.contentForm.valid) {
      this.savingArticle = true;

      const articleToSave = this.getArticleToSave();

      const articleObservables: (Observable<string> | Observable<string[]>)[] = [
        this.imagesService.uploadMultipleImages(
          this.getImages()
            .filter((image: { name: string; file: File }) => image.file)
            .map((image: { name: string; file: File }) => image.file)
        )
      ];

      if (this.isAddingArticle()) {
        articleObservables.push(this.articlesService.add(articleToSave));
      } else {
        articleObservables.push(this.articlesService.update(articleToSave));
      }

      forkJoin(articleObservables)
        .pipe(
          take(1),
          finalize(() => (this.savingArticle = false))
        )
        .subscribe(() => {
          this.location.back();
        });
    }
  }

  public isAddingArticle(): boolean {
    return this.activatedRoute.snapshot.routeConfig.path.includes('add');
  }

  public getImages(): { name: string; source: string; file: File }[] {
    return this.contentForm.controls.content.value
      .filter((content: Partial<TextContentFormType | QuoteContentFormType | ImageContentFormType>) => content.type == ArticleContentType.IMAGE)
      .map((imageContent: Partial<ImageContentFormType>) => ({ name: imageContent.name, source: imageContent.source, file: imageContent.file }));
  }

  private getActiveTab(): Tab {
    return this.tabs.find((tab: Tab) => tab.active);
  }

  private setFormField(): void {
    this.articleForm = new FormGroup({
      title: new FormControl('', Validators.required),
      subtitle: new FormControl('', Validators.required),
      authorId: new FormControl(null, Validators.required),
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
          authorId: new FormControl(null, Validators.required)
        })
      );

      this.contentForm.controls.content.push(
        new FormGroup({
          type: new FormControl(ArticleContentType.IMAGE),
          file: new FormControl(null),
          name: new FormControl(null, Validators.required),
          source: new FormControl(null, Validators.required)
        })
      );

      this.contentForm.controls.content.push(
        new FormGroup({
          type: new FormControl(ArticleContentType.TEXT),
          title: new FormControl('', Validators.required),
          text: new FormControl('', Validators.required)
        })
      );
    }

    combineLatest([this.articleForm.valueChanges, this.contentForm.valueChanges]).subscribe(() => {
      this.tabs = this.tabs.map((tab: Tab) => {
        if (tab.id === AddArticleTab.PREVIEW) {
          tab.disabled = !(this.articleForm.valid && this.contentForm.valid);
          return tab;
        }

        return tab;
      });
    });
  }

  private setFormFieldValues(article: Article): void {
    this.articleForm.setValue({
      title: article.title,
      subtitle: article.subtitle,
      authorId: article.author.id,
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

          const imageSource = this.imagesService.getPublicImageUrl(imageContent.name);

          this.contentForm.controls.content.push(
            new FormGroup({
              type: new FormControl(ArticleContentType.IMAGE),
              file: new FormControl(null),
              name: new FormControl(imageContent.name, Validators.required),
              source: new FormControl(imageSource, Validators.required)
            })
          );
          break;
        case ArticleContentType.QUOTE:
          const qouteContent = content as QuoteContent;

          this.contentForm.controls.content.push(
            new FormGroup({
              type: new FormControl(ArticleContentType.QUOTE),
              quote: new FormControl(qouteContent.quote, Validators.required),
              authorId: new FormControl(qouteContent.author.id, Validators.required)
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

  private removeNonAlphabetCharacters(input: string): string {
    const regex = /[a-z]/g;

    const matches = input.match(regex);

    if (matches) {
      return matches.join('');
    } else {
      return '';
    }
  }
}

export interface TextContentFormType {
  type: ArticleContentType;
  title: string;
  text: string;
}

export interface QuoteContentFormType {
  type: ArticleContentType;
  quote: string;
  authorId: string;
}

export interface ImageContentFormType {
  type: ArticleContentType;
  file: File;
  name: string;
  source: string;
}

export type TextContentFormGroup = FormGroup<{ type: FormControl<ArticleContentType.TEXT>; title: FormControl<string>; text: FormControl<string> }>;

export type QuoteContentFormGroup = FormGroup<{ type: FormControl<ArticleContentType.QUOTE>; quote: FormControl<string>; authorId: FormControl<string> }>;

export type ImageContentFormGroup = FormGroup<{ type: FormControl<ArticleContentType.IMAGE>; file: FormControl<File>; name: FormControl<string>; source: FormControl<string> }>;
