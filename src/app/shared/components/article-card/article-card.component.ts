import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HttpImageService } from '@core/services/image/http-image.service';
import { SkeletonDirective } from '@shared/directives/skeleton/skeleton.directive';
import { User } from '@shared/models/user/user.model';
import { SkeletonType } from 'src/app/shared/directives/skeleton/skeleton-type.enum';

@Component({
  standalone: true,
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
  imports: [MatIconModule, SkeletonDirective]
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
