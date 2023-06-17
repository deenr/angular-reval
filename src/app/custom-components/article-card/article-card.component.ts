import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() public image: string = 'first-team-picture';
  @Input() public subHeading: string = 'Design';
  @Input() public heading: string = 'UX review presentations';
  @Input() public supportingText: string = 'How do you create compelling presentations that wow your colleagues and impress your managers?';
  @Input() public author: string = 'Olivia Rhye';
  @Input() public published: string = '20 Jan 2024';

  public getImageSource(): string {
    return `../../../assets/image/${this.image}.webp`;
  }
}
