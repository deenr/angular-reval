import {Component, Input} from '@angular/core';
import {SkeletonType} from '@shared/directives/skeleton/skeleton-type.enum';
import {User} from '@shared/models/user/user';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() public loadingArticle = false;
  @Input() public image: string;
  @Input() public subHeading: string;
  @Input() public heading: string;
  @Input() public supportingText: string;
  @Input() public author: User;
  @Input() public published: string;
  public skeletonType = SkeletonType;

  public getImageSource(): string {
    return `../../../assets/image/${this.image}.webp`;
  }

  public getAuthorName(): string {
    return `${this.author.firstName} ${this.author.lastName}`;
  }
}
