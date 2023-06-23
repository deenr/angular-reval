import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public onActivate(): void {
    document.getElementsByTagName('mat-sidenav-content')[0].scrollTo(0, 0);
  }
}
