import {Component, Input} from '@angular/core';
import {SkeletonType} from '@shared/directives/skeleton/skeleton-type.enum';
import {User} from '@shared/models/user/user';
import {HttpImageService} from '@shared/services/image/http-image.service';

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

  public constructor(private readonly imageService: HttpImageService) {}

  public getImageSource(): string {
    return this.imageService.getImageUrl(this.image);
  }

  public getAuthorName(): string {
    return `${this.author.firstName} ${this.author.lastName}`;
  }
}
