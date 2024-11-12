import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticlePreviewComponent } from './add-article-preview.component';

describe('AddArticlePreviewComponent', () => {
  let component: AddArticlePreviewComponent;
  let fixture: ComponentFixture<AddArticlePreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddArticlePreviewComponent]
    });
    fixture = TestBed.createComponent(AddArticlePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
