import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NavigationItem} from './navigation-item.interface';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-interface-sidebar',
  templateUrl: './interface-sidebar.component.html',
  styleUrls: ['./interface-sidebar.component.scss']
})
export class InterfaceSidebarComponent {
  @Input() public collapsedWidth = 82;
  @Input() public expandedWidth = 280;
  @Output() public collapsedChange = new EventEmitter<boolean>();
  public collapsed = true;

  public topNavigationItems = [
    {id: 'home', name: 'Home', icon: 'home'},
    {id: 'dashboard', name: 'Dashboard', icon: 'chart'},
    {id: 'equipments', name: 'Equipment', icon: 'microscope'},
    {id: 'documents', name: 'Documents', icon: 'file'},
    {id: 'users', name: 'Users', icon: 'users'}
  ] as NavigationItem[];

  public bottomNavigationItems = [
    {id: 'support', name: 'Support', icon: 'buoy'},
    {id: 'settings', name: 'Settings', icon: 'setting'}
  ] as NavigationItem[];

  public urlToNavigationIdMap = new Map<string, string>([
    ['/app', 'home'],
    ['/app/dashboard', 'dashboard'],
    ['/app/equipments', 'equipments'],
    ['/app/documents', 'documents'],
    ['/app/users', 'users'],
    ['/app/support', 'support'],
    ['/app/settings', 'settings']
  ]);

  public constructor(private readonly router: Router) {}

  public isNavigationItemActive(id: string): boolean {
    return this.urlToNavigationIdMap.get(this.router.url) === id;
  }

  public getSidebarWidth(): string {
    return this.collapsed ? `${this.collapsedWidth}px` : `${this.expandedWidth}px`;
  }

  public changeSidebarSize(): void {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }
}
