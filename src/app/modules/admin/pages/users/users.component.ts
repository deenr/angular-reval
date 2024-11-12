import { Component, OnInit } from '@angular/core';
import { HttpUserService } from '@core/services/user/http-user.service';
import { BadgeSize } from '@shared/components/badge/badge-size.enum';
import { BadgeBuilder } from '@shared/components/table/builder/badge-builder';
import { ColumnBuilder } from '@shared/components/table/builder/column-builder';
import { FilterBuilder, FilterType } from '@shared/components/table/builder/filter-builder';
import { TableColumn } from '@shared/components/table/builder/table-column';
import { TableDataType } from '@shared/components/table/table-data-type.enum';
import { Color } from '@shared/enums/general/colors.enum';
import { UserRole } from '@shared/enums/user/user-role.enum';
import { UserStatus } from '@shared/enums/user/user-status.enum';
import { UserOverview } from '@shared/models/user/user-overview.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public tableColumns: TableColumn[];
  public tableData: UserOverview[];

  public constructor(private readonly userService: HttpUserService) {}

  public ngOnInit(): void {
    this.userService.getOverview().subscribe((usersOverview: UserOverview[]) => (this.tableData = usersOverview));

    this.tableColumns = [
      new ColumnBuilder()
        .setField('user')
        .setHeaderName('User')
        .setDataType(TableDataType.AVATAR)
        .canSort(true)
        .setAvatarNameKey(['firstName', 'lastName'])
        .setAvatarEmailKey('email')
        .setSortIds(['firstName', 'lastName'])
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
              [UserRole.USER, Color.BLUE],
              [UserRole.AUTHOR, Color.PURPLE],
              [UserRole.INCOMPLETE_PROFILE, Color.YELLOW],
              [UserRole.ADMIN, Color.ORANGE]
            ])
          );
        })
        .setFilter((filterBuilder: FilterBuilder) => {
          filterBuilder.setType(FilterType.ENUM).setEnumValues(Object.keys(UserRole)).build();
        })
        .build(),
      new ColumnBuilder()
        .setField('status')
        .setHeaderName('Status')
        .setDataType(TableDataType.BADGE)
        .canSort(false)
        .setTranslationKey('USER_STATUS')
        .setBadge((badgeBuilder: BadgeBuilder) => {
          badgeBuilder.setSize(BadgeSize.MD).setColors(
            new Map([
              [UserStatus.APPROVED, Color.GREEN],
              [UserStatus.DENIED, Color.ERROR],
              [UserStatus.PENDING, Color.GREY]
            ])
          );
        })
        .setFilter((filterBuilder: FilterBuilder) => {
          filterBuilder.setType(FilterType.ENUM).setEnumValues(Object.keys(UserStatus)).build();
        })
        .build(),
      new ColumnBuilder().setField('id').setHeaderName('User ID').setDataType(TableDataType.TEXT).canSort(true).build(),
      new ColumnBuilder()
        .setField('joined')
        .setHeaderName('Joined')
        .setDataType(TableDataType.DATE)
        .canSort(true)
        .setFilter((filterBuilder: FilterBuilder) => {
          filterBuilder.setType(FilterType.DATE).build();
        })
        .build()
      // new ColumnBuilder().setDelete((id: string) => {}).build(),
      // new ColumnBuilder().setEdit('admin/users/:id').build()
    ];
  }
}
