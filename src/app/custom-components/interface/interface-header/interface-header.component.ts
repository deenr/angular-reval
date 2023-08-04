import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-interface-header',
  templateUrl: './interface-header.component.html',
  styleUrls: ['./interface-header.component.scss']
})
export class InterfaceHeaderComponent {
  @Input() public sidenavOpened: boolean;
  @Output() public sidenavToggle = new EventEmitter();
}
