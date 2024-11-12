import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [CommonModule, MatIconModule, MatDividerModule, RouterModule]
})
export class FooterComponent {
  public readonly footerLinks = [
    {
      header: 'Company',
      links: [
        { value: 'About us', url: 'about' },
        { value: 'News', url: 'news' },
        { value: 'Contact', url: 'contact' }
      ]
    },
    {
      header: 'Social',
      links: [
        { value: 'Twitter', url: '' },
        { value: 'LinkedIn', url: '' },
        { value: 'Instagram', url: '' },
        { value: 'GitHub', url: '' }
      ]
    },
    {
      header: 'Legal',
      links: [
        { value: 'Terms', url: 'terms' },
        { value: 'Privacy', url: 'privacy' },
        { value: 'Contact', url: 'contact' }
      ]
    }
  ];

  public openLink(url: string): void {
    window.open(url, '_blank');
  }
}
