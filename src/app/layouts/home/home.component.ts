import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('sidenav') public sidenav: MatSidenav;
  public sidenavOpened = false;

  public onSidenavToggle(): void {
    if (this.sidenavOpened) {
      this.sidenav.close();
      this.sidenavOpened = false;
    } else {
      this.sidenav.open();
      this.sidenavOpened = true;
    }
  }

  public onActivate(): void {
    document.getElementsByTagName('mat-sidenav-content')[0].scrollTo(0, 0);
  }
}
