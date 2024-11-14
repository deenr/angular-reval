import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Articles, ARTICLES } from '@core/services/api/articles/articles.interface';
import { BadgeSize } from '@shared/components/badge/badge-size.enum';
import { DialogCloseType } from '@shared/components/stacked-left-dialog/dialog-close-type.enum';
import { DialogType } from '@shared/components/stacked-left-dialog/dialog-type.enum';
import { StackedLeftDialogComponent } from '@shared/components/stacked-left-dialog/stacked-left-dialog.component';
import { BadgeBuilder } from '@shared/components/table/builder/badge-builder';
import { ColumnBuilder } from '@shared/components/table/builder/column-builder';
import { FilterBuilder, FilterType } from '@shared/components/table/builder/filter-builder';
import { TableColumn } from '@shared/components/table/builder/table-column';
import { TableDataType } from '@shared/components/table/table-data-type.enum';
import { ArticleCategory } from '@shared/models/article/enums/article-category.enum';
import { ArticleOverview } from '@shared/models/article/interfaces/article.interface';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  public tableColumns: TableColumn[];
  public tableData: ArticleOverview[];

  public constructor(@Inject(ARTICLES) private readonly articlesService: Articles, private readonly dialog: MatDialog) {}

  public ngOnInit(): void {
    this.getArticles();

    this.tableColumns = [
      new ColumnBuilder()
        .setField('title')
        .setHeaderName('Title')
        .setDataType(TableDataType.TEXT_AND_DESCRIPTION)
        .setTitleKey('title')
        .setDescriptionKey('subtitle')
        .canSort(true)
        .setSortId('title')
        .setFilter((filterBuilder: FilterBuilder) => filterBuilder.setType(FilterType.TEXT).build())
        .build(),
      new ColumnBuilder()
        .setField('author')
        .setHeaderName('Author')
        .setDataType(TableDataType.AVATAR)
        .canSort(true)
        .setSortId('firstName')
        .setAvatarNameKey(['firstName', 'lastName'])
        .setAvatarEmailKey('email')
        .build(),
      new ColumnBuilder()
        .setField('published')
        .setHeaderName('Published')
        .setDataType(TableDataType.DATE)
        .canSort(true)
        .setFilter((filterBuilder: FilterBuilder) => filterBuilder.setType(FilterType.DATE).build())
        .build(),
      new ColumnBuilder()
        .setField('categories')
        .setHeaderName('Categories')
        .setDataType(TableDataType.MULTIPLE_BADGES)
        .setTranslationKey('ARTICLE_CATEGORY')
        .setBadge((badgeBuilder: BadgeBuilder) => {
          badgeBuilder.setSize(BadgeSize.MD);
        })
        .setFilter((filterBuilder: FilterBuilder) => filterBuilder.setType(FilterType.ENUM).setEnumValues(Object.keys(ArticleCategory)).build())
        .build(),
      new ColumnBuilder()
        .setDelete((id: string) => {
          this.dialog
            .open(StackedLeftDialogComponent, {
              width: '400px',
              data: {
                type: DialogType.ERROR,
                icon: 'exclamation-circle',
                title: 'Delete article',
                description: 'Are you sure you want to delete this article? This action cannot be undone.'
              }
            })
            .afterClosed()
            .subscribe((closeType: DialogCloseType) => {
              if (closeType === DialogCloseType.CONFIRM) {
                this.articlesService.delete(id).subscribe(() => this.getArticles());
              }
            });
        })
        .build(),
      new ColumnBuilder().setEdit('admin/articles/:id').build()
    ];
  }

  private getArticles(): void {
    this.articlesService.getOverview().subscribe((articles: ArticleOverview[]) => (this.tableData = articles));
  }
}
