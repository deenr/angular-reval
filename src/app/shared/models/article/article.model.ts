import { ArticleCategory } from '@shared/enums/article/article-category.enum';
import { ArticleContentType } from '@shared/enums/article/article-content-type.enum';
import { User } from '../user/user.model';
import { ArticleContent, ConclusionContent, ImageContent, IntroductionContent, QuoteContent, TextContent } from './article-content.model';
import { ArticleOverview } from './article-overview.model';

export class Article extends ArticleOverview {
  private _content: ArticleContent[];

  public constructor(id: string, title: string, subtitle: string, author: User, published: Date, categories: ArticleCategory[], image: string, content: ArticleContent[]) {
    super(id, title, subtitle, author, published, categories, image);
    this._content = content;
  }

  public get content(): ArticleContent[] {
    return this._content;
  }

  public set content(value: ArticleContent[]) {
    this._content = value;
  }

  public toJSON(): object {
    return {
      ...super.toJSON(),
      content: this.content.map((section) => section.toJSON())
    };
  }

  static fromJSON(json: any): Article {
    const articleOverview = super.fromJSON(json);
    const content = json.content.map((sectionJson: any) => {
      switch (sectionJson.type) {
        case ArticleContentType.INTRODUCTION:
          return IntroductionContent.fromJSON(sectionJson);
        case ArticleContentType.TEXT:
          return TextContent.fromJSON(sectionJson);
        case ArticleContentType.CONCLUSION:
          return ConclusionContent.fromJSON(sectionJson);
        case ArticleContentType.IMAGE:
          return ImageContent.fromJSON(sectionJson);
        case ArticleContentType.QUOTE:
          return QuoteContent.fromJSON(sectionJson);
        default:
          throw new Error(`Unknown section type: ${sectionJson.type}`);
      }
    });

    return new Article(
      articleOverview.id,
      articleOverview.title,
      articleOverview.subtitle,
      articleOverview.author,
      articleOverview.published,
      articleOverview.categories,
      articleOverview.image,
      content
    );
  }
}
