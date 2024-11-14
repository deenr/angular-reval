import { ArticleCategory } from '@shared/models/article/enums/article-category.enum';

export interface AuthorDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ArticleOverviewDTO {
  id: string;
  title: string;
  subtitle: string;
  inserted_at: Date;
  categories: ArticleCategory[];
  author: AuthorDTO | any;
  image: string;
}

export interface ArticleDTO extends ArticleOverviewDTO {
  content: string;
}
