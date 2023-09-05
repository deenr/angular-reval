import {BadgeSize} from '@custom-components/badge/badge-size.enum';
import {TableDataType} from '../table-data-type.enum';
import {Color} from '@shared/enums/general/colors.enum';
import {FilterProperties} from './filter-builder';
import {BadgeProperties} from './badge-builder';

export class TableColumn {
  constructor(
    public field: string,
    public name: string,
    public type: TableDataType,
    public sort: boolean,
    public avatarNameKey?: string,
    public avatarEmailKey?: string,
    public sortId?: string,
    public badgeProperties?: BadgeProperties,
    public onDelete?: (id: string) => void,
    public editRoute?: string,
    public filterProperties?: FilterProperties
  ) {}
}
