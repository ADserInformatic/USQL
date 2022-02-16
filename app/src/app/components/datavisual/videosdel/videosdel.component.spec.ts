import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosdelComponent } from './videosdel.component';

describe('VideosdelComponent', () => {
  let component: VideosdelComponent;
  let fixture: ComponentFixture<VideosdelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideosdelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosdelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
