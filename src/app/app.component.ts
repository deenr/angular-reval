import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';

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
    this.iconRegistry.addSvgIcon('university-0', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/logos/university-0.svg'));
    this.iconRegistry.addSvgIcon('university-1', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/logos/university-1.svg'));
    this.iconRegistry.addSvgIcon('university-2', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/logos/university-2.svg'));
    this.iconRegistry.addSvgIcon('university-3', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/logos/university-3.svg'));
    this.iconRegistry.addSvgIcon('university-4', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/logos/university-4.svg'));
    this.iconRegistry.addSvgIcon('toolbox', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/toolbox.svg'));
    this.iconRegistry.addSvgIcon('document', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/document.svg'));
    this.iconRegistry.addSvgIcon('analytics', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/analytics.svg'));
    this.iconRegistry.addSvgIcon('clock', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/clock.svg'));
    this.iconRegistry.addSvgIcon('network', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/network.svg'));
    this.iconRegistry.addSvgIcon('bell', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/bell.svg'));
    this.iconRegistry.addSvgIcon('plus-circle', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/plus-circle.svg'));
    this.iconRegistry.addSvgIcon('minus-circle', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/minus-circle.svg'));
    this.iconRegistry.addSvgIcon('hamburger', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/hamburger.svg'));
    this.iconRegistry.addSvgIcon('close', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/close.svg'));
    this.iconRegistry.addSvgIcon('github', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/logos/github.svg'));
    this.iconRegistry.addSvgIcon('twitter', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/logos/twitter.svg'));
    this.iconRegistry.addSvgIcon('linkedin', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/logos/linkedin.svg'));
    this.iconRegistry.addSvgIcon('instagram', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/logos/instagram.svg'));
    this.iconRegistry.addSvgIcon('location', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/location.svg'));
    this.iconRegistry.addSvgIcon('arrow-up-right', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/arrow-up-right.svg'));
    this.iconRegistry.addSvgIcon('users', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/users.svg'));
    this.iconRegistry.addSvgIcon('newspaper', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/newspaper.svg'));
    this.iconRegistry.addSvgIcon('phone-volume', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/phone-volume.svg'));
  }
}
