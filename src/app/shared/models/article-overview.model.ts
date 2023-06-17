import {ArticleCategory} from '@shared/enums/article-category.enum';

export class ArticleOverview {
  private _id: string;
  private _title: string;
  private _subtitle: string;
  private _author: string;
  private _published: Date;
  private _categories: ArticleCategory;

  public constructor(id: string, title: string, subtitle: string, author: string, published: Date, categories: ArticleCategory) {
    this._id = id;
    this._title = title;
    this._subtitle = subtitle;
    this._author = author;
    this._published = published;
    this._categories = categories;
  }

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public get title(): string {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  public get subtitle(): string {
    return this._subtitle;
  }

  public set subtitle(value: string) {
    this._subtitle = value;
  }

  public get author(): string {
    return this._author;
  }

  public set author(value: string) {
    this._author = value;
  }

  public get published(): Date {
    return this._published;
  }

  public set published(value: Date) {
    this._published = value;
  }

  public get categories(): ArticleCategory {
    return this._categories;
  }

  public set categories(value: ArticleCategory) {
    this._categories = value;
  }

  public toJSON(): object {
    return {
      id: this.id,
      title: this.title,
      subtitle: this.subtitle,
      author: this.author,
      published: this.published.toISOString(),
      categories: this.categories
    };
  }

  static fromJSON(json: any): ArticleOverview {
    console.log(json);
    const id = json.id;
    const title = json.title;
    const subtitle = json.subtitle;
    const author = json.author;
    const published = new Date(json.published);
    const categories = json.categories;

    return new ArticleOverview(id, title, subtitle, author, published, categories);
  }
}
