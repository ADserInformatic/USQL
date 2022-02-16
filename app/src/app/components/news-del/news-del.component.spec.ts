import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsDelComponent } from './news-del.component';

describe('NewsDelComponent', () => {
  let component: NewsDelComponent;
  let fixture: ComponentFixture<NewsDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsDelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
