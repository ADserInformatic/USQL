import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpdfComponent } from './addpdf.component';

describe('AddpdfComponent', () => {
  let component: AddpdfComponent;
  let fixture: ComponentFixture<AddpdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
