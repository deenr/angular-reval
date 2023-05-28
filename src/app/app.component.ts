import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'angular-reval';

  public constructor(
    private readonly iconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon(
      'mail',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/mail.svg')
    );
    this.iconRegistry.addSvgIcon(
      'question',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/svg/question.svg'
      )
    );
  }
}
