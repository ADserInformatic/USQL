import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoslistComponent } from './fotoslist.component';

describe('FotoslistComponent', () => {
  let component: FotoslistComponent;
  let fixture: ComponentFixture<FotoslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FotoslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
