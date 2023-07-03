import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject, throttleTime} from 'rxjs';

@Component({
  selector: 'app-progress-button',
  templateUrl: './progress-button.component.html',
  styleUrls: ['./progress-button.component.scss']
})
export class ProgressButtonComponent implements OnInit {
  @Input() public loading = false;
  @Input() public type = 'button';
  @Output() public progressClick = new EventEmitter<void>();
  private clickSubject = new Subject<void>();

  public ngOnInit(): void {
    this.clickSubject.pipe(throttleTime(1000)).subscribe(() => {
      this.progressClick.next();
    });
  }

  public onClick(event: MouseEvent): void {
    console.log(event);
    event.stopPropagation();
    this.clickSubject.next();
  }
}
