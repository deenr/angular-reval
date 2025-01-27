import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SkeletonType } from '@shared/directives/skeleton/skeleton-type.enum';
import { SkeletonDirective } from '@shared/directives/skeleton/skeleton.directive';

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

  public SkeletonType = SkeletonType;
}
