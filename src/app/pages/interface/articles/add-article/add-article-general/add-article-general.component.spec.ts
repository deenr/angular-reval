import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddArticleGeneralComponent} from './add-article-general.component';

describe('AddArticleGeneralComponent', () => {
  let component: AddArticleGeneralComponent;
  let fixture: ComponentFixture<AddArticleGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddArticleGeneralComponent]
    });
    fixture = TestBed.createComponent(AddArticleGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
