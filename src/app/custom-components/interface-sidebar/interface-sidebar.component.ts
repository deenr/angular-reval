import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavigationItem} from './navigation-item.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {UserRole} from '@shared/enums/user/user-role.enum';
import {RoleService} from '@shared/services/role/role.service';
import {BreakpointService} from '@shared/services/breakpoint/breakpoint.service';
import {Breakpoint} from '@shared/services/breakpoint/breakpoint.enum';
import {SupabaseService} from '@shared/services/supabase/supabase.service';

@Component({
  selector: 'app-interface-sidebar',
  templateUrl: './interface-sidebar.component.html',
  styleUrls: ['./interface-sidebar.component.scss']
})
export class InterfaceSidebarComponent implements OnInit {
  @Input() public collapsedWidth = 82;
  @Input() public expandedWidth = 280;
  @Output() public collapsedChange = new EventEmitter<boolean>();
  public collapsed = true;

  public topNavigationItems = [
    {id: 'home', name: 'Home', icon: 'home', routerLink: '/app', permissions: [UserRole.STUDENT, UserRole.PROFESSOR, UserRole.PHD, UserRole.ADMIN]},
    {id: 'dashboard', name: 'Dashboard', icon: 'chart', permissions: [UserRole.STUDENT, UserRole.PROFESSOR, UserRole.PHD, UserRole.ADMIN]},
    {id: 'equipments', name: 'Equipment', icon: 'microscope', permissions: [UserRole.STUDENT, UserRole.PROFESSOR, UserRole.PHD, UserRole.ADMIN]},
    {id: 'documents', name: 'Documents', icon: 'file', permissions: [UserRole.STUDENT, UserRole.PROFESSOR, UserRole.PHD, UserRole.ADMIN]},
    {id: 'users', name: 'Users', icon: 'users', permissions: [UserRole.ADMIN]},
    {id: 'news', name: 'News', icon: 'newspaper', permissions: [UserRole.ADMIN]}
  ] as NavigationItem[];

  public bottomNavigationItems = [
    {id: 'support', name: 'Support', icon: 'buoy', permissions: [UserRole.STUDENT, UserRole.PROFESSOR, UserRole.PHD, UserRole.ADMIN]},
    {id: 'settings', name: 'Settings', icon: 'setting', routerLink: '/app/settings', permissions: [UserRole.STUDENT, UserRole.PROFESSOR, UserRole.PHD, UserRole.ADMIN, UserRole.INCOMPLETE_PROFILE]}
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

  private role: UserRole;

  public constructor(
    private readonly router: Router,
    private readonly roleService: RoleService,
    private readonly breakpointService: BreakpointService,
    private readonly supabaseService: SupabaseService
  ) {}

  public ngOnInit(): void {
    this.role = this.roleService.getCurrentRole();

    this.breakpointService.observe().subscribe((breakpoint: Breakpoint) => {
      if (breakpoint === Breakpoint.MD) {
        this.minimizeSidebar();
      }
    });
  }

  public canShowNavigationItem(permissions: UserRole[]): boolean {
    return permissions.includes(this.role);
  }

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

  public signOut(): void {
    this.supabaseService.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  private minimizeSidebar(): void {
    this.collapsed = true;
    this.collapsedChange.emit(this.collapsed);
  }
}
