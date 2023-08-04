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
  public sidenavOpened = false;

  public onSidenavToggle(): void {
    this.sidenavOpened ? this.toggleSidenav(false) : this.toggleSidenav(true);
  }

  public toggleSidenav(sidenavOpened: boolean): void {
    this.sidenavOpened = sidenavOpened;
    this.sidenavOpened ? this.sidenav.open() : this.sidenav.close();
  }

  public onActivate(): void {
    document.getElementsByTagName('mat-sidenav-content')[0].scrollTo(0, 0);
  }
}
