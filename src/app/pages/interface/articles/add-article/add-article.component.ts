import {Component, OnInit} from '@angular/core';
import {AddArticleTab} from './add-article-tabs.enum';
import {Tab} from '@custom-components/tabs/tab.interface';
import {StubArticleService} from '@shared/services/article/stub-article.service';
import {ActivatedRoute} from '@angular/router';
import {Article} from '@shared/models/article/article.model';
import {BreakpointService} from '@shared/services/breakpoint/breakpoint.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {User} from '@shared/models/user/user';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {
  public tabs = [
    {id: AddArticleTab.GENERAL, name: 'General', disabled: false, active: true},
    {id: AddArticleTab.PREVIEW, name: 'Preview', disabled: false, active: false}
  ] as Tab[];

  public articleForm: FormGroup<{
    title: FormControl<string>;
    subtitle: FormControl<string>;
    author: FormControl<User>;
    published: FormControl<Date>;
  }>;

  public addArticleTab = AddArticleTab;
  public article: Article;
  public isMobile: boolean;

  public constructor(private readonly articleService: StubArticleService, private readonly activatedRoute: ActivatedRoute, private readonly breakpointService: BreakpointService) {}

  public ngOnInit(): void {
    this.breakpointService.observe().subscribe(() => (this.isMobile = this.breakpointService.isMobile));

    this.articleService.getArticleById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe((article: Article) => (this.article = article));

    this.articleForm = new FormGroup({
      title: new FormControl(this.article.title, Validators.required),
      subtitle: new FormControl(this.article.subtitle, Validators.required),
      author: new FormControl(null, Validators.required),
      published: new FormControl(this.article.published, Validators.required)
    });
  }

  public isTabActive(addArticleTab: AddArticleTab): boolean {
    return this.getActiveTab().id === addArticleTab;
  }

  private getActiveTab(): Tab {
    return this.tabs.find((tab: Tab) => tab.active);
  }
}
