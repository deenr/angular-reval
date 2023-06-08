import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-divider-with-text',
  templateUrl: './divider-with-text.component.html',
  styleUrls: ['./divider-with-text.component.scss'],
})
export class DividerWithTextComponent {
  @Input() public text: string;
}
