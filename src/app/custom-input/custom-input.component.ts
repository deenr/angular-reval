import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent {
  @Input() public label: string;
  @Input() public placeholder: string;
  @Input() public hint: string;
  @Input() public leadingIcon: string;
  @Input() public trailingIcon: string;
  @Input() public type = 'text';
  @Input() public value = '';
}
