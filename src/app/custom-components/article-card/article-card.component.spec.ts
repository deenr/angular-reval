import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleCardComponent } from './article-card.component';

describe('ArticleCardComponent', () => {
  let component: ArticleCardComponent;
  let fixture: ComponentFixture<ArticleCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleCardComponent]
    });
    fixture = TestBed.createComponent(ArticleCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getImageSource', () => {
    it('should return the correct image path', () => {
      component.image = 'image';

      expect(component.getImageSource()).toEqual('../../../assets/image/image.webp');
    });
  });
});
