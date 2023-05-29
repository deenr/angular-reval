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
  selected: Date | null;

  public states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

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
    this.iconRegistry.addSvgIcon(
      'chevron-down',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/svg/chevron-down.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'check',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/check.svg')
    );
    this.iconRegistry.addSvgIcon(
      'calendar',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/svg/calendar.svg'
      )
    );
  }
}
