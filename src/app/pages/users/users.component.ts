import {Component, OnInit} from '@angular/core';
import {UsersTab} from './users-tab.enum';
import {Tab} from '@custom-components/tabs/tab.interface';
import {BadgeSize} from '@custom-components/badge/badge-size.enum';
import {BadgeBuilder} from '@custom-components/table/builder/badge-builder';
import {ColumnBuilder} from '@custom-components/table/builder/column-builder';
import {TableColumn} from '@custom-components/table/builder/table-column';
import {TableDataType} from '@custom-components/table/table-data-type.enum';
import {UserRole} from '@shared/enums/user/user-role.enum';
import {Color} from '@shared/enums/general/colors.enum';
import {FilterBuilder, FilterType} from '@custom-components/table/builder/filter-builder';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public tabs = [
    {id: UsersTab.OVERVIEW, name: 'Overview', disabled: false, active: true},
    {id: UsersTab.INSIGHT, name: 'Insight', disabled: false, active: false},
    {id: UsersTab.TABLE, name: 'Table', disabled: false, active: false}
  ] as Tab[];

  public usersTab = UsersTab;

  public tableColumns: TableColumn[];
  public tableData: UserOverview[];

  public ngOnInit(): void {
    this.tableColumns = [
      new ColumnBuilder()
        .setField('user')
        .setHeaderName('User')
        .setDataType(TableDataType.AVATAR)
        .canSort(true)
        .setAvatarNameKey('name')
        .setAvatarEmailKey('email')
        .setSortId('name')
        .setFilter((filterBuilder: FilterBuilder) => {
          filterBuilder.setType(FilterType.TEXT).build();
        })
        .build(),
      new ColumnBuilder()
        .setField('role')
        .setHeaderName('Role')
        .setDataType(TableDataType.BADGE)
        .canSort(false)
        .setTranslationKey('USER_ROLE')
        .setBadge((badgeBuilder: BadgeBuilder) => {
          badgeBuilder.setSize(BadgeSize.MD).setColors(
            new Map([
              [UserRole.STUDENT, Color.INDIGO],
              [UserRole.PHD, Color.YELLOW],
              [UserRole.PROFESSOR, Color.FUCHSIA],
              [UserRole.INCOMPLETE_PROFILE, Color.ROSE],
              [UserRole.ADMIN, Color.ORANGE]
            ])
          );
        })
        .setFilter((filterBuilder: FilterBuilder) => {
          filterBuilder.setType(FilterType.ENUM).setEnumValues(Object.keys(UserRole)).build();
        })
        .build(),
      new ColumnBuilder().setField('universityId').setHeaderName('University ID').setDataType(TableDataType.TEXT).canSort(true).build(),
      new ColumnBuilder().setField('joined').setHeaderName('Joined').setDataType(TableDataType.DATE).canSort(true).build(),
      new ColumnBuilder()
        .setDelete((id: string) => {
          console.log(id);
        })
        .build(),
      new ColumnBuilder().setEdit('app/users/:id').build()
    ];

    const users: UserOverview[] = [];
    for (let i = 1; i <= 85; i++) {
      users.push(createNewUser(i));
    }
    this.tableData = users;
  }

  public isTabActive(usersTab: UsersTab): boolean {
    return this.getActiveTab().id === usersTab;
  }

  private getActiveTab(): Tab {
    return this.tabs.find((tab: Tab) => tab.active);
  }
}

function createNewUser(id: number): UserOverview {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' + NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    email: `${name.replace('.', '').replace(' ', '.').toLowerCase()}@gmail.com`,
    role: getRandomEnumValue(UserRole),
    joined: new Date(Math.random() * 1e12),
    universityId: `${Math.floor(Math.random() * 90000) + 10000}`
  };
}

function getRandomEnumValue<T>(enumObj: T): T[keyof T] {
  const enumValues = Object.values(enumObj);
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
}

const NAMES = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth'
];

interface UserOverview {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  joined: Date;
  universityId: string;
}
