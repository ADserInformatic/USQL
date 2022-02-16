import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosaddComponent } from './videosadd.component';

describe('VideosaddComponent', () => {
  let component: VideosaddComponent;
  let fixture: ComponentFixture<VideosaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideosaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
