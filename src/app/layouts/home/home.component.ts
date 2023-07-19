import {Component, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('sidenav') public sidenav: MatSidenav;

  public onSidenavToggle(openSidenav: boolean): void {
    openSidenav ? this.sidenav.toggle() : this.sidenav.close();
  }

  public onActivate(): void {
    document.getElementsByTagName('mat-sidenav-content')[0].scrollTo(0, 0);
  }

  public isSidenavOpen(): boolean {
    return document.getElementsByClassName('mat-drawer-opened').length !== 0;
  }
}
