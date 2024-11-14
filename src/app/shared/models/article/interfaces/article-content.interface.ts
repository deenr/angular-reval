import { ArticleContentType } from '../enums/article-content-type.enum';
import { Author } from './article.interface';

interface BaseArticleContent {
  type: ArticleContentType;
}

interface TitledContent extends BaseArticleContent {
  title: string;
  text: string[];
}

export interface IntroductionContent extends TitledContent {
  type: ArticleContentType.INTRODUCTION;
}

export interface TextContent extends TitledContent {
  type: ArticleContentType.TEXT;
}

export interface ConclusionContent extends TitledContent {
  type: ArticleContentType.CONCLUSION;
}

export interface ImageContent extends BaseArticleContent {
  type: ArticleContentType.IMAGE;
  name: string;
}

export interface QuoteContent extends BaseArticleContent {
  type: ArticleContentType.QUOTE;
  author: Author;
  quote: string;
}

export type ArticleContent = IntroductionContent | TextContent | ConclusionContent | ImageContent | QuoteContent;
