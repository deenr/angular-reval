import {ArticleContentType} from '@shared/enums/article/article-content-type.enum';
import {User} from '../user/user.model';

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
  private _name: string;

  public constructor(name: string) {
    super(ArticleContentType.IMAGE);
    this._name = name;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public toJSON(): object {
    return {
      ...super.toJSON(),
      name: this.name
    };
  }

  public static fromJSON(json: any): ImageContent {
    const name = json.name;

    return new ImageContent(name);
  }
}

export class QuoteContent extends ArticleContent {
  private _authorId: string;
  private _quote: string;

  public constructor(authorId: string, quote: string) {
    super(ArticleContentType.QUOTE);
    this._authorId = authorId;
    this._quote = quote;
  }

  public get authorId(): string {
    return this._authorId;
  }

  public set authorId(value: string) {
    this._authorId = value;
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
      authorId: this.authorId,
      quote: this.quote
    };
  }

  public static fromJSON(json: any): QuoteContent {
    const authorId = json.authorId;
    const quote = json.quote;

    return new QuoteContent(authorId, quote);
  }
}
