import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoseditComponent } from './fotosedit.component';

describe('FotoseditComponent', () => {
  let component: FotoseditComponent;
  let fixture: ComponentFixture<FotoseditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FotoseditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
