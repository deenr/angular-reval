import {BadgeSize} from '@custom-components/badge/badge-size.enum';
import {ColumnBuilder} from './column-builder';
import {Color} from '@shared/enums/general/colors.enum';

export class BadgeBuilder {
  constructor(private columnBuilder: ColumnBuilder) {
    this.columnBuilder.badgeProperties = {
      translationKey: '',
      size: BadgeSize.MD,
      colors: new Map()
    };
  }

  public setTranslationKey(translationKey: string): BadgeBuilder {
    this.columnBuilder.badgeProperties.translationKey = translationKey;
    return this;
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
