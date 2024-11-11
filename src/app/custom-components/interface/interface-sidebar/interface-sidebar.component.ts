import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from '@shared/enums/user/user-role.enum';
import { AuthService } from '@shared/services/auth/auth.service';
import { Breakpoint } from '@shared/services/breakpoint/breakpoint.enum';
import { BreakpointService } from '@shared/services/breakpoint/breakpoint.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { RoleService } from '@shared/services/role/role.service';
import { NavigationItem } from './navigation-item.interface';

@Component({
  selector: 'app-interface-sidebar',
  templateUrl: './interface-sidebar.component.html',
  styleUrls: ['./interface-sidebar.component.scss']
})
export class InterfaceSidebarComponent implements OnInit {
  @Input() public collapsedWidth = 82;
  @Input() public expandedWidth = 280;
  @Output() public collapsedChange = new EventEmitter<boolean>();
  @Output() public sidenavClose = new EventEmitter<void>();
  public collapsed = true;
  public userName: string;
  public userEmail: string;

  public topNavigationItems = [
    // {id: 'home', name: 'Home', icon: 'home', routerLink: '/app', permissions: [UserRole.STUDENT, UserRole.PROFESSOR, UserRole.PHD, UserRole.ADMIN]},
    { id: 'articles', name: 'Articles', icon: 'newspaper', routerLink: '/app', permissions: [UserRole.USER, UserRole.AUTHOR, UserRole.ADMIN] },
    { id: 'users', name: 'Users', icon: 'users', routerLink: '/app/users', permissions: [UserRole.ADMIN] }
  ] as NavigationItem[];

  public bottomNavigationItems = [
    { id: 'settings', name: 'Settings', icon: 'setting', routerLink: '/app/settings', permissions: [UserRole.USER, UserRole.AUTHOR, UserRole.ADMIN, UserRole.INCOMPLETE_PROFILE] }
  ] as NavigationItem[];

  public BASE_URL_TO_NAVIGATION_ID = new Map<string, string>([
    ['/app', 'articles'],
    ['/app/dashboard', 'dashboard'],
    ['/app/equipment', 'equipment'],
    ['/app/documents', 'documents'],
    ['/app/users', 'users'],
    ['/app/support', 'support'],
    ['/app/settings', 'settings']
  ]);

  public isMobile: boolean;
  public isTablet: boolean;

  public readonly role = this.roleService.getCurrentRole();

  public constructor(
    private readonly router: Router,
    private readonly roleService: RoleService,
    private readonly breakpointService: BreakpointService,
    private readonly authService: AuthService,
    private readonly localStorageService: LocalStorageService
  ) {}

  public ngOnInit(): void {
    this.breakpointService.observe().subscribe((breakpoint: Breakpoint) => {
      if (this.isScreenSmall(breakpoint)) {
        this.minimizeSidebar();
      }
      this.isMobile = this.breakpointService.isMobile;
      this.isTablet = this.breakpointService.isTablet;
    });

    const localUserNameAndEmail = JSON.parse(this.localStorageService.getItem('user')) as { email: string; name: string };
    this.userEmail = localUserNameAndEmail?.email;
    this.userName = localUserNameAndEmail?.name;
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
    this.authService.signOut().then(() => {
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
