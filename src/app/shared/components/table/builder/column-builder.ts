import { TableDataType } from '../table-data-type.enum';
import { BadgeBuilder, BadgeProperty } from './badge-builder';
import { FilterBuilder, FilterProperty } from './filter-builder';
import { TableColumn } from './table-column';

export class ColumnBuilder {
  public badgeProperties?: BadgeProperty;
  public filterProperties?: FilterProperty;
  public translationKey?: string;
  private field: string = '';
  private name: string = '';
  private type: TableDataType = TableDataType.TEXT;
  private sort: boolean = false;
  private avatarNameKey?: string | string[];
  private avatarEmailKey?: string;
  private sortField?: string;
  private sortFields?: string[];
  private onDelete?: (id: string) => void;
  private onApprove?: { valueKey: string; value: any; action: (id: string) => void };
  private onDeny?: { valueKey: string; value: any; action: (id: string) => void };
  private editRoute?: string;
  private titleKey?: string;
  private descriptionKey?: string;

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

  public setAvatarNameKey(avatarNameKey: string | string[]): ColumnBuilder {
    this.avatarNameKey = avatarNameKey;
    return this;
  }

  public setAvatarEmailKey(avatarEmailKey: string): ColumnBuilder {
    this.avatarEmailKey = avatarEmailKey;
    return this;
  }

  public setTitleKey(titleKey: string): ColumnBuilder {
    this.titleKey = titleKey;
    return this;
  }

  public setDescriptionKey(descriptionKey: string): ColumnBuilder {
    this.descriptionKey = descriptionKey;
    return this;
  }

  public setSortId(sortField: string): ColumnBuilder {
    this.sortField = sortField;
    return this;
  }

  public setSortIds(sortFields: string[]): ColumnBuilder {
    this.sortFields = sortFields;
    return this;
  }

  public setTranslationKey(translationKey: string): ColumnBuilder {
    this.translationKey = translationKey;

    return this;
  }

  public setBadge(configureBadge: (badgeBuilder: BadgeBuilder) => void): ColumnBuilder {
    if (this.type === TableDataType.BADGE || this.type === TableDataType.MULTIPLE_BADGES) {
      const badgeBuilder = new BadgeBuilder(this);
      configureBadge(badgeBuilder);
    } else {
      throw new Error('setBadge method can only be used with TableDataType.BADGE.');
    }
    return this;
  }

  public setApprove(valueKey: string, value: any, action: (id: string) => void): ColumnBuilder {
    this.field = 'approve';
    this.type = TableDataType.APPROVE;

    this.onApprove = { valueKey, value, action };

    return this;
  }

  public setDeny(valueKey: string, value: any, action: (id: string) => void): ColumnBuilder {
    this.field = 'deny';
    this.type = TableDataType.DENY;

    this.onDeny = { valueKey, value, action };

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
    this.filterProperties.fields = this.sortFields ?? null;

    return this;
  }

  public build(): TableColumn {
    if (this.type === TableDataType.AVATAR && (!this.avatarNameKey || !this.avatarEmailKey || !(this.sortField || this.sortFields))) {
      throw new Error('Avatar columns require avatarNameKey, avatarEmailKey, and sortField(s) properties.');
    } else if (this.type === TableDataType.BADGE && !this.badgeProperties) {
      throw new Error('Badge columns require badgeProperties');
    } else if (this.type === TableDataType.TEXT_AND_DESCRIPTION && (!this.titleKey || !this.descriptionKey || !this.sortField)) {
      throw new Error('Avatar columns require titleKey, descriptionKey and sortField properties.');
    }

    return new TableColumn(
      this.field,
      this.name,
      this.type,
      this.sort ?? false,
      this.avatarNameKey,
      this.avatarEmailKey,
      this.sortField,
      this.sortFields,
      this.badgeProperties,
      this.onDelete,
      this.onApprove,
      this.onDeny,
      this.editRoute,
      this.filterProperties,
      this.translationKey,
      this.titleKey,
      this.descriptionKey
    );
  }
}
