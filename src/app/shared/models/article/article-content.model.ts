import {ArticleContentType} from '@shared/enums/article/article-content-type.enum';

export abstract class ArticleContent {
  private _type: ArticleContentType;

  public constructor(type: ArticleContentType) {
    this._type = type;
  }

  public get type(): ArticleContentType {
    return this._type;
  }

  public set type(value: ArticleContentType) {
    this._type = value;
  }

  public toJSON(): object {
    return {
      type: this.type
    };
  }

  public static fromJSON(json: any): ArticleContent {
    const type = json.type;

    switch (type) {
      case ArticleContentType.INTRODUCTION:
        return IntroductionContent.fromJSON(json);
      case ArticleContentType.TEXT:
        return TextContent.fromJSON(json);
      case ArticleContentType.CONCLUSION:
        return ConclusionContent.fromJSON(json);
      case ArticleContentType.IMAGE:
        return ImageContent.fromJSON(json);
      case ArticleContentType.QUOTE:
        return QuoteContent.fromJSON(json);
      default:
        throw new Error(`Unknown section type: ${type}`);
    }
  }
}

export class IntroductionContent extends ArticleContent {
  private _title: string;
  private _text: string[];

  public constructor(title: string, text: string[]) {
    super(ArticleContentType.INTRODUCTION);
    this._title = title;
    this._text = text;
  }

  public get title(): string {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  public get text(): string[] {
    return this._text;
  }

  public set text(value: string[]) {
    this._text = value;
  }

  public toJSON(): object {
    return {
      ...super.toJSON(),
      title: this.title,
      text: this.text
    };
  }

  public static fromJSON(json: any): IntroductionContent {
    const title = json.title;
    const text = json.text;

    return new IntroductionContent(title, text);
  }
}

export class TextContent extends ArticleContent {
  private _title: string;
  private _text: string[];

  public constructor(title: string, text: string[]) {
    super(ArticleContentType.TEXT);
    this._title = title;
    this._text = text;
  }

  public get title(): string {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  public get text(): string[] {
    return this._text;
  }

  public set text(value: string[]) {
    this._text = value;
  }

  public toJSON(): object {
    return {
      ...super.toJSON(),
      title: this.title,
      text: this.text
    };
  }

  public static fromJSON(json: any): TextContent {
    const title = json.title;
    const text = json.text;

    return new TextContent(title, text);
  }
}

export class ConclusionContent extends ArticleContent {
  private _title: string;
  private _text: string[];

  public constructor(title: string, text: string[]) {
    super(ArticleContentType.CONCLUSION);
    this._title = title;
    this._text = text;
  }

  public get title(): string {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  public get text(): string[] {
    return this._text;
  }

  public set text(value: string[]) {
    this._text = value;
  }

  public toJSON(): object {
    return {
      ...super.toJSON(),
      title: this.title,
      text: this.text
    };
  }

  public static fromJSON(json: any): ConclusionContent {
    const title = json.title;
    const text = json.text;

    return new ConclusionContent(title, text);
  }
}

export class ImageContent extends ArticleContent {
  private _source: string;

  public constructor(source: string) {
    super(ArticleContentType.IMAGE);
    this._source = source;
  }

  public get source(): string {
    return this._source;
  }

  public set source(value: string) {
    this._source = value;
  }

  public toJSON(): object {
    return {
      ...super.toJSON(),
      source: this.source
    };
  }

  public static fromJSON(json: any): ImageContent {
    const source = json.source;

    return new ImageContent(source);
  }
}

export class QuoteContent extends ArticleContent {
  private _author: string;
  private _quote: string;

  public constructor(author: string, quote: string) {
    super(ArticleContentType.QUOTE);
    this._author = author;
    this._quote = quote;
  }

  public get author(): string {
    return this._author;
  }

  public set author(value: string) {
    this._author = value;
  }

  public get quote(): string {
    return this._quote;
  }

  public set quote(value: string) {
    this._quote = value;
  }

  public toJSON(): object {
    return {
      ...super.toJSON(),
      author: this.author,
      quote: this.quote
    };
  }

  public static fromJSON(json: any): QuoteContent {
    const author = json.author;
    const quote = json.quote;

    return new QuoteContent(author, quote);
  }
}
