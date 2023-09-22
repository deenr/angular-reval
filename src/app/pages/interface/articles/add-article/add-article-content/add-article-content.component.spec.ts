import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticleContentComponent } from './add-article-content.component';

describe('AddArticleContentComponent', () => {
  let component: AddArticleContentComponent;
  let fixture: ComponentFixture<AddArticleContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddArticleContentComponent]
    });
    fixture = TestBed.createComponent(AddArticleContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
