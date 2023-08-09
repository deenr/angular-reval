import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {Subject, throttleTime} from 'rxjs';

@Component({
  selector: 'app-progress-button',
  templateUrl: './progress-button.component.html',
  styleUrls: ['./progress-button.component.scss']
})
export class ProgressButtonComponent implements OnInit {
  @ViewChild('button') public buttonElement: MatButton;
  @Input() public loading = false;
  @Input() public type = 'button';
  @Input() public size = 'lg';
  @Output() public progressClick = new EventEmitter<void>();

  public width: string;
  private clickSubject = new Subject<void>();

  public ngOnInit(): void {
    this.clickSubject.pipe(throttleTime(1000)).subscribe(() => {
      this.progressClick.next();
    });
  }

  public onClick(event: MouseEvent): void {
    event.stopPropagation();
    this.clickSubject.next();
    this.width = `${(this.buttonElement._elementRef.nativeElement as HTMLElement).offsetWidth}px`;
  }

  public getClassList(): string {
    return `full-width ${this.size}`;
  }
}
