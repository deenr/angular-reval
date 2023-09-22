import {Component, OnInit} from '@angular/core';
import {BadgeSize} from '@custom-components/badge/badge-size.enum';
import {BadgeBuilder} from '@custom-components/table/builder/badge-builder';
import {ColumnBuilder} from '@custom-components/table/builder/column-builder';
import {FilterBuilder, FilterType} from '@custom-components/table/builder/filter-builder';
import {TableColumn} from '@custom-components/table/builder/table-column';
import {TableDataType} from '@custom-components/table/table-data-type.enum';
import {ArticleCategory} from '@shared/enums/article/article-category.enum';
import {ArticleOverview} from '@shared/models/article/article-overview.model';
import {StubArticleService} from '@shared/services/article/stub-article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  public tableColumns: TableColumn[];
  public tableData: ArticleOverview[];

  public constructor(private readonly articleService: StubArticleService) {}

  public ngOnInit(): void {
    this.articleService.getOverview().subscribe((articles: ArticleOverview[]) => (this.tableData = articles));

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
      new ColumnBuilder().setField('author').setHeaderName('Author').canSort(true).build(),
      new ColumnBuilder()
        .setField('published')
        .setHeaderName('Published')
        .setDataType(TableDataType.DATE)
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
          console.log(id);
        })
        .build(),
      new ColumnBuilder().setEdit('app/articles/edit/:id').build()
    ];
  }
}
