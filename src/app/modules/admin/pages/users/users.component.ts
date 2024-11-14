import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Users, USERS } from '@core/services/api/users/users.interface';
import { BadgeSize } from '@shared/components/badge/badge-size.enum';
import { DialogCloseType } from '@shared/components/stacked-left-dialog/dialog-close-type.enum';
import { DialogType } from '@shared/components/stacked-left-dialog/dialog-type.enum';
import { StackedLeftDialogComponent } from '@shared/components/stacked-left-dialog/stacked-left-dialog.component';
import { BadgeBuilder } from '@shared/components/table/builder/badge-builder';
import { ColumnBuilder } from '@shared/components/table/builder/column-builder';
import { FilterBuilder, FilterType } from '@shared/components/table/builder/filter-builder';
import { TableColumn } from '@shared/components/table/builder/table-column';
import { TableDataType } from '@shared/components/table/table-data-type.enum';
import { Color } from '@shared/models/color/enums/colors.enum';
import { UserRole } from '@shared/models/user/enums/user-role.enum';
import { UserStatus } from '@shared/models/user/enums/user-status.enum';
import { UserOverview } from '@shared/models/user/interfaces/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public tableColumns: TableColumn[];
  public tableData: UserOverview[];

  public constructor(@Inject(USERS) private readonly usersService: Users, private readonly dialog: MatDialog) {}

  public ngOnInit(): void {
    this.getUsers();

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
        .build(),
      new ColumnBuilder()
        .setDelete((id: string) => {
          this.dialog
            .open(StackedLeftDialogComponent, {
              width: '400px',
              data: {
                type: DialogType.ERROR,
                icon: 'exclamation-circle',
                title: 'Delete user',
                description: 'Are you sure you want to delete this user? This action cannot be undone.'
              }
            })
            .afterClosed()
            .subscribe((closeType: DialogCloseType) => {
              if (closeType === DialogCloseType.CONFIRM) {
                this.usersService.delete(id).subscribe(() => this.getUsers());
              }
            });
        })
        .build()
      // new ColumnBuilder().setDelete((id: string) => {}).build(),
      // new ColumnBuilder().setEdit('admin/users/:id').build()
    ];
  }

  private getUsers(): void {
    this.usersService.getOverview().subscribe((usersOverview: UserOverview[]) => {
      this.tableData = usersOverview;
      console.log(usersOverview.length);
    });
  }
}
