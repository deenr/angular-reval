import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AUTHENTICATION, Authentication } from '@core/services/api/authentication/authentication.interface';
import { Breakpoint, BreakpointService } from '@core/services/breakpoint.service';
import { UserRoleService } from '@core/services/user-role.service';
import { UserRole } from '@shared/models/user/enums/user-role.enum';
import { take } from 'rxjs';
import { NavigationItem } from './navigation-item.interface';

@Component({
  selector: 'app-interface-sidebar',
  templateUrl: './interface-sidebar.component.html',
  styleUrls: ['./interface-sidebar.component.scss']
})
export class InterfaceSidebarComponent implements OnInit {
  @Input() public collapsedWidth = 82;
  @Input() public expandedWidth = 280;
  @Input() public user: { name: string; email: string };
  @Output() public collapsedChange = new EventEmitter<boolean>();
  @Output() public sidenavClose = new EventEmitter<void>();
  public collapsed = true;

  public topNavigationItems = [
    // {id: 'home', name: 'Home', icon: 'home', routerLink: '/app', permissions: [UserRole.STUDENT, UserRole.PROFESSOR, UserRole.PHD, UserRole.ADMIN]},
    { id: 'articles', name: 'Articles', icon: 'newspaper', routerLink: '/admin', permissions: [UserRole.USER, UserRole.AUTHOR, UserRole.ADMIN] },
    { id: 'users', name: 'Users', icon: 'users', routerLink: '/admin/users', permissions: [UserRole.ADMIN] }
  ] as NavigationItem[];

  public bottomNavigationItems = [
    { id: 'settings', name: 'Settings', icon: 'setting', routerLink: '/admin/settings', permissions: [UserRole.USER, UserRole.AUTHOR, UserRole.ADMIN, UserRole.INCOMPLETE_PROFILE] }
  ] as NavigationItem[];

  public BASE_URL_TO_NAVIGATION_ID = new Map<string, string>([
    ['/admin', 'articles'],
    ['/admin/dashboard', 'dashboard'],
    ['/admin/equipment', 'equipment'],
    ['/admin/documents', 'documents'],
    ['/admin/users', 'users'],
    ['/admin/support', 'support'],
    ['/admin/settings', 'settings']
  ]);

  public isMobile: boolean;
  public isTablet: boolean;

  public readonly role = this.userRoleService.getCurrentRole();

  public constructor(
    @Inject(AUTHENTICATION) private readonly authentication: Authentication,
    private readonly router: Router,
    private readonly breakpointService: BreakpointService,
    private readonly userRoleService: UserRoleService
  ) {}

  public ngOnInit(): void {
    this.breakpointService.observe().subscribe((breakpoint: Breakpoint) => {
      if (this.isScreenSmall(breakpoint)) {
        this.minimizeSidebar();
      }
      this.isMobile = this.breakpointService.isMobile;
      this.isTablet = this.breakpointService.isTablet;
    });
  }

  public canShowNavigationItem(permissions: UserRole[]): boolean {
    return permissions.includes(this.role);
  }

  public isNavigationItemActive(id: string): boolean {
    const baseUrl = [...this.BASE_URL_TO_NAVIGATION_ID.keys()].reverse().find((url: string) => this.router.url.includes(url));

    return baseUrl && this.BASE_URL_TO_NAVIGATION_ID.get(baseUrl) === id;
  }

  public getSidebarWidth(): string {
    return this.collapsed ? `${this.collapsedWidth}px` : `${this.expandedWidth}px`;
  }

  public changeSidebarSize(): void {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }

  public signOut(): void {
    this.authentication
      .signOut()
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }

  public canShowLogoutNavigationItem(): boolean {
    return (this.isScreenSmall(this.breakpointService.currentBreakpoint) && !(this.isMobile || this.isTablet)) || this.isUserProfileIncomplete();
  }

  public isUserProfileIncomplete(): boolean {
    return this.role === UserRole.INCOMPLETE_PROFILE;
  }

  public isDesktopSidebarCollapsed(): boolean {
    return !this.isMobile && !this.isTablet && this.collapsed;
  }

  public onNavigationChange(): void {
    if (this.isMobile || this.isTablet) {
      this.sidenavClose.emit();
    }
  }

  private minimizeSidebar(): void {
    this.collapsed = true;
    this.collapsedChange.emit(this.collapsed);
  }

  private isScreenSmall(breakpoint: Breakpoint): boolean {
    return breakpoint === Breakpoint.MD || breakpoint === Breakpoint.SM || breakpoint === Breakpoint.XS;
  }
}
