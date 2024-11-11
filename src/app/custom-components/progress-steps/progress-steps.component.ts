import { Component, Input } from '@angular/core';
import { ProgressStep } from './progress-step.interface';

@Component({
  selector: 'app-progress-steps',
  templateUrl: './progress-steps.component.html',
  styleUrls: ['./progress-steps.component.scss']
})
export class ProgressStepsComponent {
  @Input() public steps: ProgressStep[];
}
