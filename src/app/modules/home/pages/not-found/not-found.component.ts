import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  panelOpenState = false;

  public constructor(private readonly location: Location) {}

  public goBack(): void {
    this.location.back();
  }
}
