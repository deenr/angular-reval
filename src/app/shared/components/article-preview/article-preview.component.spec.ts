import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleCategory } from '@shared/enums/article/article-category.enum';
import { ArticleContentType } from '@shared/enums/article/article-content-type.enum';
import { ConclusionContent, ImageContent, IntroductionContent, QuoteContent, TextContent } from '@shared/models/article/article-content.model';
import { ArticlePreviewComponent } from './article-preview.component';

describe('ArticlePreviewComponent', () => {
  let component: ArticlePreviewComponent;
  let fixture: ComponentFixture<ArticlePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticlePreviewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlePreviewComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('getTitle', () => {
    it('should return the title of IntroductionContent', () => {
      const content = { type: ArticleContentType.INTRODUCTION, title: 'Intro' } as IntroductionContent;
      const title = component.getTitle(content);

      expect(title).toEqual('Intro');
    });

    it('should return the title of TextContent', () => {
      const content = { type: ArticleContentType.TEXT, title: 'Text' } as TextContent;
      const title = component.getTitle(content);

      expect(title).toEqual('Text');
    });

    it('should return the title of ConclusionContent', () => {
      const content = { type: ArticleContentType.CONCLUSION, title: 'Conclusion' } as ConclusionContent;
      const title = component.getTitle(content);

      expect(title).toEqual('Conclusion');
    });
  });

  describe('isContentIntroduction', () => {
    it('should return true for ArticleContentType.INTRODUCTION', () => {
      const isIntro = component.isContentIntroduction(ArticleContentType.INTRODUCTION);

      expect(isIntro).toBeTrue();
    });

    it('should return false for other content types', () => {
      const isIntro = component.isContentIntroduction(ArticleContentType.TEXT);

      expect(isIntro).toBeFalse();
    });
  });

  describe('getText', () => {
    it('should return text for IntroductionContent', () => {
      const content = { type: ArticleContentType.INTRODUCTION, text: ['Intro Text'] } as IntroductionContent;
      const text = component.getText(content);

      expect(text).toEqual(['Intro Text']);
    });

    it('should return text for TextContent', () => {
      const content = { type: ArticleContentType.TEXT, text: ['Text Content'] } as TextContent;
      const text = component.getText(content);

      expect(text).toEqual(['Text Content']);
    });

    it('should return text for ConclusionContent', () => {
      const content = { type: ArticleContentType.CONCLUSION, text: ['Conclusion Text'] } as ConclusionContent;
      const text = component.getText(content);

      expect(text).toEqual(['Conclusion Text']);
    });
  });

  describe('isContentImage', () => {
    it('should return true for ArticleContentType.IMAGE', () => {
      const isImage = component.isContentImage(ArticleContentType.IMAGE);

      expect(isImage).toBeTrue();
    });

    it('should return false for other content types', () => {
      const isImage = component.isContentImage(ArticleContentType.TEXT);

      expect(isImage).toBeFalse();
    });
  });

  describe('getImageSource', () => {
    it('should return the image source', () => {
      const content = { type: ArticleContentType.IMAGE, source: 'image1' } as any as ImageContent;
      const imageSource = component.getImageSource(content);

      expect(imageSource).toEqual(`../../../assets/image/image1.webp`);
    });
  });

  describe('isContentText', () => {
    it('should return true for ArticleContentType.TEXT', () => {
      const isText = component.isContentText(ArticleContentType.TEXT);
      expect(isText).toBeTrue();
    });

    it('should return false for other content types', () => {
      const isText = component.isContentText(ArticleContentType.IMAGE);
      expect(isText).toBeFalse();
    });
  });

  describe('isContentQuote', () => {
    it('should return true for ArticleContentType.QUOTE', () => {
      const isQuote = component.isContentQuote(ArticleContentType.QUOTE);
      expect(isQuote).toBeTrue();
    });

    it('should return false for other content types', () => {
      const isQuote = component.isContentQuote(ArticleContentType.IMAGE);
      expect(isQuote).toBeFalse();
    });
  });

  describe('getQuoteText', () => {
    it('should return the quote text', () => {
      const content = { type: ArticleContentType.QUOTE, quote: 'A great quote' } as QuoteContent;
      const quoteText = component.getQuoteText(content);

      expect(quoteText).toEqual('A great quote');
    });
  });

  describe('getQuoteAuthor', () => {
    it('should return the quote author', () => {
      const content = { type: ArticleContentType.QUOTE, author: 'Author Name' } as any as QuoteContent;
      const quoteAuthor = component.getQuoteAuthor(content);
      expect(quoteAuthor).toEqual('Author Name');
    });
  });

  describe('isContentConclusion', () => {
    it('should return true for ArticleContentType.CONCLUSION', () => {
      const isConclusion = component.isContentConclusion(ArticleContentType.CONCLUSION);
      expect(isConclusion).toBeTrue();
    });

    it('should return false for other content types', () => {
      const isConclusion = component.isContentConclusion(ArticleContentType.IMAGE);
      expect(isConclusion).toBeFalse();
    });
  });

  describe('getDate', () => {
    it('should return a formatted date', () => {
      const date = new Date('2023-09-20');
      const formattedDate = component.getDate(date);
      expect(formattedDate).toEqual('20 September 2023');
    });
  });

  describe('getCategoryTranslation', () => {
    it('should return the translated category', () => {
      const category = ArticleCategory.RESEARCH_TOOLS;
      const translation = component.getCategoryTranslation(category);
      expect(translation).toEqual('Tools');
    });
  });
});
