import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-avatar',
  templateUrl: './table-avatar.component.html',
  styleUrls: ['./table-avatar.component.scss']
})
export class TableAvatarComponent {
  @Input() public name: string;
  @Input() public email: string;
}
