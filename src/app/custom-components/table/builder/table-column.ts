import {BadgeSize} from '@custom-components/badge/badge-size.enum';
import {TableDataType} from '../table-data-type.enum';
import {BadgeColor} from '@custom-components/badge/badge-color.enum';

export class TableColumn {
  constructor(
    public field: string,
    public name: string,
    public type: TableDataType,
    public sort: boolean,
    public avatarNameKey?: string,
    public avatarEmailKey?: string,
    public sortId?: string,
    public badgeProperties?: {
      translationKey: string;
      size: BadgeSize;
      colors: Map<any, BadgeColor>;
    }
  ) {}
}
