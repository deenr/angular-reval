import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SkeletonType} from '@shared/directives/skeleton/skeleton-type.enum';
import {User} from '@shared/models/user/user';

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
    published: FormControl<Date>;
  }>;

  public skeletonType = SkeletonType;
  public loadingArticle = false;

  public ngOnInit(): void {}
}
