import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SkeletonDirective } from '@shared/directives/skeleton/skeleton.directive';
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
  @Input() public authorName: string;
  @Input() public published: string;

  public skeletonType = SkeletonType;
}
