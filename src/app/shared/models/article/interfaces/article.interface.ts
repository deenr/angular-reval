import { User } from '@shared/models/user/interfaces/user.interface';
import { ArticleCategory } from '../enums/article-category.enum';
import { ArticleContent } from './article-content.interface';

export type Author = Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>;

export interface ArticleOverview {
  id: string;
  title: string;
  subtitle: string;
  author: Author;
  published: Date;
  categories: ArticleCategory[];
  image: string;
}

export interface Article extends ArticleOverview {
  content: ArticleContent[];
}
