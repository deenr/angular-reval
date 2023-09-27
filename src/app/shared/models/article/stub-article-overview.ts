import {ArticleCategory} from '@shared/enums/article/article-category.enum';
import {ArticleOverview} from './article-overview.model';

export class StubArticleOverview {
  public static getEmptyArticleOverview(): ArticleOverview {
    return this.getEmptyArticleOverviewWithId('');
  }
  public static getEmptyArticleOverviewWithId(id: string): ArticleOverview {
    return new ArticleOverview(id, '', '', null, new Date(), [ArticleCategory.RESEARCH_TOOLS, ArticleCategory.APPLICATION_DEVELOPMENT], '');
  }
}
