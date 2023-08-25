import {AfterViewChecked, AfterViewInit, Component} from '@angular/core';
import {UsersMetric} from '../users-metric.interface';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {BreakpointService} from '@shared/services/breakpoint/breakpoint.service';
import {UserRole} from '@shared/enums/user/user-role.enum';
import {BadgeColor} from '@custom-components/badge/badge-color.enum';
import {BadgeSize} from '@custom-components/badge/badge-size.enum';
import {ColumnBuilder} from '@custom-components/table/builder/column-builder';
import {TableDataType} from '@custom-components/table/table-data-type.enum';
import {TableColumn} from '@custom-components/table/builder/table-column';
import {BadgeBuilder} from '@custom-components/table/builder/badge-builder';

@Component({
  selector: 'app-users-overview',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.scss']
})
export class UsersOverviewComponent {
  public userMetrics: UsersMetric[] = [
    {
      title: 'Total users',
      amount: '2,420',
      differenceInPercentage: '20%',
      positive: true
    },
    {
      title: 'New users',
      amount: '350',
      differenceInPercentage: '10%',
      positive: true
    },
    {
      title: 'Monthly active users',
      amount: '800',
      differenceInPercentage: '-25%',
      positive: false
    }
  ];

  public isMobile: boolean;
  public isTablet: boolean;

  public tableColumns: TableColumn[];
  public tableData: UserOverview[];

  public constructor(private readonly breakpointService: BreakpointService) {
    this.breakpointService.observe().subscribe(() => {
      this.isMobile = this.breakpointService.isMobile;
      this.isTablet = this.breakpointService.isTablet;
    });

    this.tableColumns = [
      new ColumnBuilder().setField('user').setHeaderName('User').setDataType(TableDataType.AVATAR).canSort(true).setAvatarNameKey('name').setAvatarEmailKey('email').setSortId('name').build(),
      new ColumnBuilder()
        .setField('role')
        .setHeaderName('Role')
        .setDataType(TableDataType.BADGE)
        .canSort(false)
        .setBadge((badgeBuilder: BadgeBuilder) => {
          badgeBuilder
            .setTranslationKey('USER_ROLE')
            .setSize(BadgeSize.MD)
            .setColors(
              new Map([
                [UserRole.STUDENT, BadgeColor.WARNING],
                [UserRole.PHD, BadgeColor.PRIMARY],
                [UserRole.PROFESSOR, BadgeColor.SUCCESS],
                [UserRole.INCOMPLETE_PROFILE, BadgeColor.ERROR],
                [UserRole.ADMIN, BadgeColor.GRAY]
              ])
            );
        })
        .build(),
      new ColumnBuilder().setField('universityId').setHeaderName('University ID').setDataType(TableDataType.TEXT).canSort(true).build(),
      new ColumnBuilder().setField('joined').setHeaderName('Joined').setDataType(TableDataType.DATE).canSort(true).build()
    ];

    const users: UserOverview[] = [];
    for (let i = 1; i <= 100; i++) {
      users.push(createNewUser(i));
    }
    this.tableData = users;
  }

  public getMetricOverviewFlexProperties(): string {
    return this.isMobile || this.isTablet ? `1` : `0 0 ${(document.getElementsByTagName('app-metrics-card')[0] as HTMLElement)?.offsetHeight}px`;
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

export interface UserOverview {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  joined: Date;
  universityId: string;
}
