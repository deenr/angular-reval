import {Component} from '@angular/core';
import {UsersTab} from './users-tab.enum';
import {Tab} from '@custom-components/tabs/tab.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  public tabs = [
    {id: UsersTab.OVERVIEW, name: 'Overview', disabled: false, active: true},
    {id: UsersTab.INSIGHT, name: 'Insight', disabled: false, active: false},
    {id: UsersTab.TABLE, name: 'Table', disabled: false, active: false}
  ] as Tab[];

  public usersTab = UsersTab;

  public isTabActive(usersTab: UsersTab): boolean {
    return this.getActiveTab().id === usersTab;
  }

  private getActiveTab(): Tab {
    return this.tabs.find((tab: Tab) => tab.active);
  }
}
