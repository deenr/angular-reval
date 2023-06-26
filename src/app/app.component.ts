import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {SVG_ICONS as svgIcons} from './svg-icons.generated';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public constructor(private readonly iconRegistry: MatIconRegistry, private readonly domSanitizer: DomSanitizer) {
    svgIcons.forEach((icon: {name: string; path: string}) => {
      this.iconRegistry.addSvgIcon(icon.name, this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path));
    });
  }
}
