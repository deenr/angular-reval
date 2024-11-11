import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatIconRegistry } from '@angular/material/icon';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set the svg icons', () => {
    const iconRegistry = TestBed.inject(MatIconRegistry);

    expect(iconRegistry.addSvgIcon).toHaveBeenCalled();
  });
});
