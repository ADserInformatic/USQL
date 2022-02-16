import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotosdelComponent } from './fotosdel.component';

describe('FotosdelComponent', () => {
  let component: FotosdelComponent;
  let fixture: ComponentFixture<FotosdelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FotosdelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FotosdelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
