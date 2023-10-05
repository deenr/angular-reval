import {Component, OnInit} from '@angular/core';
import {AddArticleTab} from './add-article-tabs.enum';
import {Tab} from '@custom-components/tabs/tab.interface';
import {ActivatedRoute} from '@angular/router';
import {Article} from '@shared/models/article/article.model';
import {BreakpointService} from '@shared/services/breakpoint/breakpoint.service';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {User} from '@shared/models/user/user';
import {ArticleCategory} from '@shared/enums/article/article-category.enum';
import {ArticleContent, ConclusionContent, ImageContent, IntroductionContent, QuoteContent, TextContent} from '@shared/models/article/article-content.model';
import {ArticleContentType} from '@shared/enums/article/article-content-type.enum';
import {Location} from '@angular/common';
import {Observable, forkJoin} from 'rxjs';
import {HttpImageService} from '@shared/services/image/http-image.service';
import {HttpArticleService} from '@shared/services/article/http-article.service';
import {HttpUserService} from '@shared/services/user/http-user.service';

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
    content: FormArray<TextContentFormGroup | QuoteContentFormGroup | ImageContentFormGroup>;
  }>;

  public authors: User[];
  public addArticleTab = AddArticleTab;
  public article: Article;
  public isMobile: boolean;
  public loadingArticle = false;
  public savingArticle = false;

  public constructor(
    private readonly articleService: HttpArticleService,
    private readonly userService: HttpUserService,
    private readonly imageService: HttpImageService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly breakpointService: BreakpointService,
    private readonly location: Location
  ) {}

  public ngOnInit(): void {
    this.breakpointService.observe().subscribe(() => (this.isMobile = this.breakpointService.isMobile));

    this.setFormField();

    const requests: (Observable<Article> | Observable<User[]>)[] = [this.userService.getAll()];

    if (!this.isAddingArticle()) {
      this.loadingArticle = true;

      requests.push(this.articleService.getById(this.activatedRoute.snapshot.paramMap.get('id')));
    }

    forkJoin(requests).subscribe(([authors, article]: (User[] | Article)[]) => {
      this.authors = authors as User[];

      this.article = article as Article;

      this.setFormFieldValues(article as Article);
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
        return new QuoteContent(quoteContent.author.id, quoteContent.quote);
      } else if ((content as ImageContentFormType).source) {
        const imageContent = content as ImageContent;
        if (imageName === undefined) {
          imageName = imageContent.name;
        }
        return new ImageContent(imageContent.name);
      } else {
        const textContent = content as TextContentFormType;

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
      this.article?.id ??
        this.articleForm.value?.title
          .split(' ')
          .slice(0, 5)
          .map((value: string) => this.removeNonAlphabetCharacters(value.toLowerCase()))
          .join('-'),
      this.articleForm.value?.title,
      this.articleForm.value?.subtitle,
      this.articleForm.value?.author,
      this.articleForm.value?.published,
      this.articleForm.value?.categories,
      imageName,
      content
    );
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

      const articleObservables: (Observable<string> | Promise<string[]>)[] = [
        this.imageService.uploadImages(
          this.getImages()
            .filter((image: {name: string; file: File}) => image.file)
            .map((image: {name: string; file: File}) => image.file)
        )
      ];

      if (this.isAddingArticle()) {
        articleObservables.push(this.articleService.add(articleToSave));
      } else {
        articleObservables.push(this.articleService.update(articleToSave));
      }

      forkJoin(articleObservables).subscribe(() => {
        this.location.back();
      });
    }
  }

  public isAddingArticle(): boolean {
    return this.activatedRoute.snapshot.routeConfig.path.includes('add');
  }

  public getImages(): {name: string; source: string; file: File}[] {
    return this.contentForm.controls.content.value
      .filter((content: Partial<TextContentFormType | QuoteContentFormType | ImageContentFormType>) => content.type == ArticleContentType.IMAGE)
      .map((imageContent: Partial<ImageContentFormType>) => ({name: imageContent.name, source: imageContent.source, file: imageContent.file}));
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
      // );`

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
      author: this.authors.find((author: User) => author.id === article.author.id),
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

          const imageSource = this.imageService.getImage(imageContent.name);

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
              author: new FormControl(
                this.authors.find((author: User) => author.id === qouteContent.authorId),
                Validators.required
              )
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
  author: User;
}

export interface ImageContentFormType {
  type: ArticleContentType;
  file: File;
  name: string;
  source: string;
}

export type TextContentFormGroup = FormGroup<{type: FormControl<ArticleContentType.TEXT>; title: FormControl<string>; text: FormControl<string>}>;

export type QuoteContentFormGroup = FormGroup<{type: FormControl<ArticleContentType.QUOTE>; quote: FormControl<string>; author: FormControl<User>}>;

export type ImageContentFormGroup = FormGroup<{type: FormControl<ArticleContentType.IMAGE>; file: FormControl<File>; name: FormControl<string>; source: FormControl<string>}>;
