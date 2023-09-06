import {ColumnBuilder} from './column-builder';

export enum FilterType {
  TEXT = 'TEXT',
  ENUM = 'ENUM',
  DATE = 'DATE'
}

export interface FilterProperty {
  type: FilterType;
  field: string;
  enumValues?: string[];
  translationKey?: string;
}

export class FilterBuilder {
  constructor(private columnBuilder: ColumnBuilder) {
    this.columnBuilder.filterProperties = {type: null, field: null, enumValues: null};
  }

  public setType(type: FilterType): FilterBuilder {
    this.columnBuilder.filterProperties.type = type;

    return this;
  }

  public setEnumValues(enumValues: any): FilterBuilder {
    this.columnBuilder.filterProperties.enumValues = enumValues;

    return this;
  }

  public build(): ColumnBuilder {
    this.columnBuilder.filterProperties = this.columnBuilder.filterProperties;

    if (this.columnBuilder.filterProperties.type !== FilterType.ENUM && this.columnBuilder.filterProperties.enumValues) {
      throw new Error('enumValues can only be set for ENUM filter type.');
    } else if (
      this.columnBuilder.filterProperties.type === FilterType.ENUM &&
      (this.columnBuilder.filterProperties.enumValues === null || this.columnBuilder.filterProperties.enumValues === undefined || this.columnBuilder.filterProperties.enumValues.length === 0)
    ) {
      throw new Error('enumValues must be provided for ENUM filter type.');
    }
    this.columnBuilder.filterProperties.translationKey = this.columnBuilder.translationKey;

    return this.columnBuilder;
  }
}
