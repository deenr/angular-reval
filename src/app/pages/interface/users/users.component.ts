import {Component, OnInit} from '@angular/core';
import {BadgeSize} from '@custom-components/badge/badge-size.enum';
import {BadgeBuilder} from '@custom-components/table/builder/badge-builder';
import {ColumnBuilder} from '@custom-components/table/builder/column-builder';
import {TableColumn} from '@custom-components/table/builder/table-column';
import {TableDataType} from '@custom-components/table/table-data-type.enum';
import {UserRole} from '@shared/enums/user/user-role.enum';
import {Color} from '@shared/enums/general/colors.enum';
import {FilterBuilder, FilterType} from '@custom-components/table/builder/filter-builder';
import {UserOverview} from '@shared/models/user/user-overview';
import {HttpUserService} from '@shared/services/user/http-user.service';

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
        .setSortId('firstName')
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
          console.log(id);
        })
        .build(),
      new ColumnBuilder().setEdit('app/users/:id').build()
    ];
  }
}
