import {BadgeSize} from '@custom-components/badge/badge-size.enum';
import {ColumnBuilder} from './column-builder';
import {Color} from '@shared/enums/general/colors.enum';

export interface BadgeProperty {
  size: BadgeSize;
  colors: Map<any, Color>;
}

export class BadgeBuilder {
  constructor(private columnBuilder: ColumnBuilder) {
    this.columnBuilder.badgeProperties = {
      size: BadgeSize.MD,
      colors: new Map()
    };
  }

  public setSize(size: BadgeSize): BadgeBuilder {
    this.columnBuilder.badgeProperties.size = size;
    return this;
  }

  public setColors(colors: Map<any, Color>): BadgeBuilder {
    this.columnBuilder.badgeProperties.colors = colors;
    return this;
  }

  public build(): ColumnBuilder {
    return this.columnBuilder;
  }
}
