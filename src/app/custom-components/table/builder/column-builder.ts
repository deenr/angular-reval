import {BadgeSize} from '@custom-components/badge/badge-size.enum';
import {TableDataType} from '../table-data-type.enum';
import {BadgeBuilder, BadgeProperty} from './badge-builder';
import {TableColumn} from './table-column';
import {Color} from '@shared/enums/general/colors.enum';
import {FilterBuilder, FilterProperty, FilterType} from './filter-builder';

export class ColumnBuilder {
  public badgeProperties?: BadgeProperty;
  public filterProperties?: FilterProperty;
  public translationKey?: string;
  private field: string = '';
  private name: string = '';
  private type: TableDataType = TableDataType.TEXT;
  private sort: boolean = false;
  private avatarNameKey?: string;
  private avatarEmailKey?: string;
  private sortField?: string;
  private onDelete?: (id: string) => void;
  private editRoute?: string;

  public setField(field: string): ColumnBuilder {
    this.field = field;
    return this;
  }

  public setHeaderName(name: string): ColumnBuilder {
    this.name = name;
    return this;
  }

  public setDataType(type: TableDataType): ColumnBuilder {
    this.type = type;
    return this;
  }

  public canSort(sort: boolean): ColumnBuilder {
    this.sort = sort;
    return this;
  }

  public setAvatarNameKey(avatarNameKey: string): ColumnBuilder {
    this.avatarNameKey = avatarNameKey;
    return this;
  }

  public setAvatarEmailKey(avatarEmailKey: string): ColumnBuilder {
    this.avatarEmailKey = avatarEmailKey;
    return this;
  }

  public setSortId(sortField: string): ColumnBuilder {
    this.sortField = sortField;
    return this;
  }

  public setTranslationKey(translationKey: string): ColumnBuilder {
    this.translationKey = translationKey;

    return this;
  }

  public setBadge(configureBadge: (badgeBuilder: BadgeBuilder) => void): ColumnBuilder {
    if (this.type === TableDataType.BADGE) {
      const badgeBuilder = new BadgeBuilder(this);
      configureBadge(badgeBuilder);
    } else {
      throw new Error('setBadge method can only be used with TableDataType.BADGE.');
    }
    return this;
  }

  public setDelete(onDelete: (id: string) => void): ColumnBuilder {
    this.field = 'delete';
    this.type = TableDataType.DELETE;

    this.onDelete = onDelete;

    return this;
  }

  public setEdit(route: string): ColumnBuilder {
    this.field = 'edit';
    this.type = TableDataType.EDIT;
    this.editRoute = route;

    return this;
  }

  public setFilter(configureFilter: (filterBuilder: FilterBuilder) => void): ColumnBuilder {
    const filterBuilder = new FilterBuilder(this);
    configureFilter(filterBuilder);
    this.filterProperties.field = this.sortField ?? this.field;

    return this;
  }

  public build(): TableColumn {
    if (this.type === TableDataType.AVATAR && (!this.avatarNameKey || !this.avatarEmailKey || !this.sortField)) {
      throw new Error('Avatar columns require avatarNameKey, avatarEmailKey, and sortField properties.');
    } else if (this.type === TableDataType.BADGE && !this.badgeProperties) {
      throw new Error('Badge columns require badgeProperties');
    }

    return new TableColumn(
      this.field,
      this.name,
      this.type,
      this.sort ?? false,
      this.avatarNameKey,
      this.avatarEmailKey,
      this.sortField,
      this.badgeProperties,
      this.onDelete,
      this.editRoute,
      this.filterProperties,
      this.translationKey
    );
  }
}
