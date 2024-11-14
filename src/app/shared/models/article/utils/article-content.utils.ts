import { ArticleContentType } from '../enums/article-content-type.enum';
import { ArticleContent } from '../interfaces/article-content.interface';

/**
 * Deserializes JSON into an array of ArticleContent objects.
 *
 * @param json The JSON object to deserialize.
 * @returns The deserialized array of ArticleContent objects.
 * @throws {Error} If the content type is unknown.
 */
export const parseArticleContent = (json: any, authors: { id: string; firstName: string; lastName: string; email: string }[]): ArticleContent[] => {
  return json.map((item: any) => {
    switch (item.type) {
      case ArticleContentType.INTRODUCTION:
        return {
          type: ArticleContentType.INTRODUCTION,
          title: item.title,
          text: item.text
        };
      case ArticleContentType.TEXT:
        return {
          type: ArticleContentType.TEXT,
          title: item.title,
          text: item.text
        };
      case ArticleContentType.CONCLUSION:
        return {
          type: ArticleContentType.CONCLUSION,
          title: item.title,
          text: item.text
        };
      case ArticleContentType.IMAGE:
        return {
          type: ArticleContentType.IMAGE,
          name: item.name
        };
      case ArticleContentType.QUOTE:
        return {
          type: ArticleContentType.QUOTE,
          author: authors.find((author) => author.id === (item.authorId ?? item.author.id)),
          quote: item.quote
        };
      default:
        throw new Error(`Unknown content type: ${item.type}`);
    }
  });
};
