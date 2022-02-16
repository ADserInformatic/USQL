import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotosaddComponent } from './fotosadd.component';

describe('FotosaddComponent', () => {
  let component: FotosaddComponent;
  let fixture: ComponentFixture<FotosaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FotosaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FotosaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
