import {Component, Input} from '@angular/core';
import {SkeletonType} from '@shared/directives/skeleton/skeleton-type.enum';
import {ArticleContentType} from '@shared/enums/article/article-content-type.enum';
import {Article} from '@shared/models/article/article.model';
import {User} from '@shared/models/user/user';

@Component({
  selector: 'app-add-article-content',
  templateUrl: './add-article-content.component.html',
  styleUrls: ['./add-article-content.component.scss']
})
export class AddArticleContentComponent {
  @Input() public isMobile: boolean;
  @Input() public article: Article;
  @Input() public authors: User[];
  @Input() public loadingArticle: boolean;

  public skeletonType = SkeletonType;

  public isContentIntroduction(articleContentType: ArticleContentType): boolean {
    return articleContentType === ArticleContentType.INTRODUCTION;
  }

  public isContentText(articleContentType: ArticleContentType): boolean {
    return articleContentType === ArticleContentType.TEXT;
  }

  public isContentConclusion(articleContentType: ArticleContentType): boolean {
    return articleContentType === ArticleContentType.CONCLUSION;
  }

  public isContentQuote(articleContentType: ArticleContentType): boolean {
    return articleContentType === ArticleContentType.QUOTE;
  }

  public isContentImage(articleContentType: ArticleContentType): boolean {
    return articleContentType === ArticleContentType.IMAGE;
  }
}
