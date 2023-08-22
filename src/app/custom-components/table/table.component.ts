import {Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {BadgeSize} from '@custom-components/badge/badge-size.enum';
import {UserRole} from '@shared/enums/user/user-role.enum';
import {TableDataType} from './table-data-type.enum';
import {BadgeColor} from '@custom-components/badge/badge-color.enum';
import {User} from '@shared/models/user/user';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [{provide: MatPaginatorIntl, useValue: getPaginatorIntl()}]
})
export class TableComponent {
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  public displayedColumns: string[];
  public columns = [
    {id: 'user', name: 'User', type: TableDataType.AVATAR, sort: true, avatarNameKey: 'name', avatarEmailKey: 'email', sortId: 'name'},
    {
      id: 'role',
      name: 'Role',
      type: TableDataType.BADGE,
      sort: false,
      badgeProperties: {
        translationKey: 'ENUM.USER_ROLE',
        size: BadgeSize.SM,
        colors: new Map([
          [UserRole.STUDENT, BadgeColor.WARNING],
          [UserRole.PHD, BadgeColor.PRIMARY],
          [UserRole.PROFESSOR, BadgeColor.SUCCESS],
          [UserRole.INCOMPLETE_PROFILE, BadgeColor.ERROR],
          [UserRole.ADMIN, BadgeColor.GRAY]
        ])
      }
    },
    {id: 'universityId', name: 'University ID', type: TableDataType.TEXT, sort: true},
    {id: 'joined', name: 'Joined', type: TableDataType.DATE, sort: true}
  ];
  public dataSource: MatTableDataSource<UserOverview>;

  public tableDataType = TableDataType;
  public badgeSize = BadgeSize;

  public constructor() {
    this.displayedColumns = this.columns.map((column: {id: string; name: string; type: TableDataType; sort: boolean}) => column.id);

    const users: UserOverview[] = [];
    for (let i = 1; i <= 100; i++) {
      users.push(createNewUser(i));
    }

    this.dataSource = new MatTableDataSource(users);
  }

  public getBadgeTranslationKey(id: string, value: any): string {
    const translationKey = this.columns.find((column: any) => column.id === id).badgeProperties.translationKey;
    return `${translationKey}.${value}`;
  }

  public getBadgeSize(id: string): BadgeSize {
    return this.columns.find((column: any) => column.id === id).badgeProperties.size;
  }

  public getBadgeColor(id: string, value: any): BadgeColor {
    return this.columns.find((column: any) => column.id === id).badgeProperties.colors.get(value);
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Page 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Page ${page + 1} of ${amountPages}`;
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

function getPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.getRangeLabel = (page: number, pageSize: number, _: number) => `Page ${page + 1} of ${pageSize}`;
  paginatorIntl.nextPageLabel = 'Next Page';
  paginatorIntl.previousPageLabel = 'Previous Page';
  return paginatorIntl;
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

export interface UserOverview {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  joined: Date;
  universityId: string;
}
