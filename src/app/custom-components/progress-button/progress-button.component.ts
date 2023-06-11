import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-progress-button',
  templateUrl: './progress-button.component.html',
  styleUrls: ['./progress-button.component.scss']
})
export class ProgressButtonComponent {
  @Input() public loading = false;
  @Output() public click = new EventEmitter<void>();
}
