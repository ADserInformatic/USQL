import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsaddphotoComponent } from './newsaddphoto.component';

describe('NewsaddphotoComponent', () => {
  let component: NewsaddphotoComponent;
  let fixture: ComponentFixture<NewsaddphotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsaddphotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsaddphotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
