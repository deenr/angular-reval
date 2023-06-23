import {ArticleCategory} from '@shared/enums/article-category.enum';
import {Article} from './article.model';
import {IntroductionContent, TextContent} from './article-content.model';

export class StubArticle {
  public static getEmptyArticle(): Article {
    return this.getEmptyArticleWithId('');
  }
  public static getEmptyArticleWithId(id: string): Article {
    return new Article(id, '', '', '', new Date(), [ArticleCategory.RESEARCH_TOOLS, ArticleCategory.APPLICATION_DEVELOPMENT], '', [
      new IntroductionContent('', []),
      new TextContent('', []),
      new TextContent('', []),
      new TextContent('', [])
    ]);
  }
}
