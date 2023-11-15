import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {BadgeSize} from '@custom-components/badge/badge-size.enum';
import {DialogCloseType} from '@custom-components/dialogs/dialog-close-type.enum';
import {DialogType} from '@custom-components/dialogs/dialog-type.enum';
import {StackedLeftDialogComponent} from '@custom-components/dialogs/stacked-left-dialog/stacked-left-dialog.component';
import {BadgeBuilder} from '@custom-components/table/builder/badge-builder';
import {ColumnBuilder} from '@custom-components/table/builder/column-builder';
import {FilterBuilder, FilterType} from '@custom-components/table/builder/filter-builder';
import {TableColumn} from '@custom-components/table/builder/table-column';
import {TableDataType} from '@custom-components/table/table-data-type.enum';
import {ArticleCategory} from '@shared/enums/article/article-category.enum';
import {ArticleOverview} from '@shared/models/article/article-overview.model';
import {HttpArticleService} from '@shared/services/article/http-article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  public tableColumns: TableColumn[];
  public tableData: ArticleOverview[];

  public constructor(private readonly articleService: HttpArticleService, private readonly dialog: MatDialog) {}

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
                this.articleService.delete(id).subscribe(() => this.getArticles());
              }
            });
        })
        .build(),
      new ColumnBuilder().setEdit('app/articles/edit/:id').build()
    ];
  }

  private getArticles(): void {
    this.articleService.getOverview().subscribe((articles: ArticleOverview[]) => (this.tableData = articles));
  }
}
