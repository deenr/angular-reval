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
import {forkJoin} from 'rxjs';
import {ArticleContent, ConclusionContent, ImageContent, IntroductionContent, QuoteContent, TextContent} from '@shared/models/article/article-content.model';
import {ArticleContentType} from '@shared/enums/article/article-content-type.enum';

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
    content: FormArray<any>;
  }>;

  public authors: User[];
  public addArticleTab = AddArticleTab;
  public article: Article;
  public isMobile: boolean;
  public loadingArticle = true;

  public constructor(
    private readonly articleService: StubArticleService,
    private readonly userService: StubUserService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly breakpointService: BreakpointService
  ) {}

  public ngOnInit(): void {
    this.breakpointService.observe().subscribe(() => (this.isMobile = this.breakpointService.isMobile));

    this.setFormField();

    forkJoin([this.articleService.getArticleById(this.activatedRoute.snapshot.paramMap.get('id')), this.userService.getUsers()]).subscribe(([article, authors]: [Article, User[]]) => {
      this.article = article;
      this.authors = authors;

      this.setFormFieldValues(article, authors);
    });
  }

  public isTabActive(addArticleTab: AddArticleTab): boolean {
    return this.getActiveTab().id === addArticleTab;
  }

  public getArticleToSave(): Article {
    const content = this.articleForm.value.content.map((content: TextContentFormGroup | QuoteContentFormGroup | ImageContentFormGroup, index: number) => {
      if ((content as QuoteContentFormGroup).quote) {
        const quoteContent = content as QuoteContentFormGroup;
        return new QuoteContent(quoteContent.author, quoteContent.quote);
      } else if ((content as ImageContentFormGroup).source) {
        const imageContent = content as ImageContent;
        return new ImageContent(imageContent.source);
      } else {
        const textContent = content as TextContentFormGroup;

        if (index === 0) {
          return new IntroductionContent(textContent.title, textContent.text);
        } else if (index === this.articleForm.value.content.length - 1) {
          return new ConclusionContent(textContent.title, textContent.text);
        } else {
          return new TextContent(textContent.title, textContent.text);
        }
      }
    });

    return new Article(
      null,
      this.articleForm.value.title,
      this.articleForm.value.subtitle,
      this.articleForm.value.author.id,
      this.articleForm.value.published,
      this.articleForm.value.categories,
      null,
      content
    );
  }

  private getActiveTab(): Tab {
    return this.tabs.find((tab: Tab) => tab.active);
  }

  private setFormField(): void {
    this.articleForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      subtitle: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
      categories: new FormControl(null, Validators.required),
      published: new FormControl(null, Validators.required),
      content: new FormArray([])
    });
  }

  private setFormFieldValues(article: Article, authors: User[]): void {
    this.articleForm.setValue({
      title: article.title,
      subtitle: article.subtitle,
      author: authors.find((user: User) => article.author === user.id),
      categories: article.categories,
      published: article.published,
      content: []
    });

    this.article.content.forEach((content: ArticleContent) => {
      switch (content.type) {
        case ArticleContentType.INTRODUCTION:
          const introductionContent = content as IntroductionContent;

          this.articleForm.controls.content.push(
            new FormGroup({
              title: new FormControl(introductionContent.title, Validators.required),
              text: new FormControl(introductionContent.text, Validators.required)
            })
          );
          break;
        case ArticleContentType.TEXT:
          const textContent = content as TextContent;

          this.articleForm.controls.content.push(
            new FormGroup({
              title: new FormControl(textContent.title, Validators.required),
              text: new FormControl(textContent.text, Validators.required)
            })
          );
          break;
        case ArticleContentType.IMAGE:
          const imageContent = content as ImageContent;

          this.articleForm.controls.content.push(
            new FormGroup({
              source: new FormControl(imageContent.source, Validators.required)
            })
          );
          break;
        case ArticleContentType.QUOTE:
          const qouteContent = content as QuoteContent;

          this.articleForm.controls.content.push(
            new FormGroup({
              quote: new FormControl(qouteContent.quote, Validators.required),
              author: new FormControl(qouteContent.author, Validators.required)
            })
          );
          break;
        case ArticleContentType.CONCLUSION:
          const conclusionContent = content as ConclusionContent;

          this.articleForm.controls.content.push(
            new FormGroup({
              title: new FormControl(conclusionContent.title, Validators.required),
              text: new FormControl(conclusionContent.text, Validators.required)
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

interface TextContentFormGroup {
  title: string;
  text: string[];
}

interface QuoteContentFormGroup {
  quote: string;
  author: string;
}

interface ImageContentFormGroup {
  source: string;
}
