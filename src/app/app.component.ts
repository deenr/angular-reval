import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public constructor(private readonly iconRegistry: MatIconRegistry, private readonly domSanitizer: DomSanitizer) {
    this.iconRegistry.addSvgIcon('email', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/email.svg'));
    this.iconRegistry.addSvgIcon('question', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/question.svg'));
    this.iconRegistry.addSvgIcon('chevron-down', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/chevron-down.svg'));
    this.iconRegistry.addSvgIcon('chevron-up', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/chevron-up.svg'));
    this.iconRegistry.addSvgIcon('chevron-down', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/chevron-down.svg'));
    this.iconRegistry.addSvgIcon('chevron-right', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/chevron-right.svg'));
    this.iconRegistry.addSvgIcon('chevron-left', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/chevron-left.svg'));
    this.iconRegistry.addSvgIcon('check', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/check.svg'));
    this.iconRegistry.addSvgIcon('calendar', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/calendar.svg'));
    this.iconRegistry.addSvgIcon('google-color', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/color/google-color.svg'));
    this.iconRegistry.addSvgIcon('logo-color', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/color/logo-color.svg'));
    this.iconRegistry.addSvgIcon('user', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/user.svg'));
    this.iconRegistry.addSvgIcon('lock', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/lock.svg'));
    this.iconRegistry.addSvgIcon('details', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/details.svg'));
    this.iconRegistry.addSvgIcon('mail', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/mail.svg'));
    this.iconRegistry.addSvgIcon('arrow-up', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/arrow-up.svg'));
    this.iconRegistry.addSvgIcon('arrow-down', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/arrow-down.svg'));
    this.iconRegistry.addSvgIcon('arrow-right', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/arrow-right.svg'));
    this.iconRegistry.addSvgIcon('arrow-left', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/arrow-left.svg'));
    this.iconRegistry.addSvgIcon('loading', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/loading.svg'));
    this.iconRegistry.addSvgIcon('check-circle', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/check-circle.svg'));
    this.iconRegistry.addSvgIcon('search', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/search.svg'));
  }
}
