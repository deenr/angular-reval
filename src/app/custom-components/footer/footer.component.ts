import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public readonly footerLinks = [
    {
      header: 'Company',
      links: [
        {value: 'About us', url: '/about'},
        {value: 'News', url: ''},
        {value: 'Contact', url: '/contact'}
      ]
    },
    {
      header: 'Social',
      links: [
        {value: 'Twitter', url: ''},
        {value: 'LinkedIn', url: ''},
        {value: 'Instagram', url: ''},
        {value: 'GitHub', url: ''}
      ]
    },
    {
      header: 'Legal',
      links: [
        {value: 'Terms', url: ''},
        {value: 'Privacy', url: ''},
        {value: 'Contact', url: '/contact'}
      ]
    }
  ];
}
