import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() public label: string;
  @Input() public placeholder: string;
  @Input() public leadingIcon: string;
  @Input() public trailingIcon: string;
}
