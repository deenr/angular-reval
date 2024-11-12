import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  imports: [CommonModule]
})
export class PaginatorComponent {
  @Input() public activePage: number;
  @Input() public pages: number;

  public get pageItems(): { active: boolean }[] {
    return [...Array(this.pages).keys()].map((_, index: number) => ({ active: index + 1 === this.activePage }));
  }
}
