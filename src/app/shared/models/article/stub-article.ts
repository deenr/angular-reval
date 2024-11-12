import { ArticleCategory } from '@shared/enums/article/article-category.enum';
import { IntroductionContent, TextContent } from './article-content.model';
import { Article } from './article.model';

export class StubArticle {
  public static getEmptyArticle(): Article {
    return this.getEmptyArticleWithId('');
  }
  public static getEmptyArticleWithId(id: string): Article {
    return new Article(id, '', '', null, new Date(), [ArticleCategory.RESEARCH_TOOLS, ArticleCategory.APPLICATION_DEVELOPMENT], '', [
      new IntroductionContent('', []),
      new TextContent('', []),
      new TextContent('', []),
      new TextContent('', [])
    ]);
  }
}
