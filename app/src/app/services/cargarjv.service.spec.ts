import { TestBed } from '@angular/core/testing';

import { CargarjvService } from './cargarjv.service';

describe('CargarjvService', () => {
  let service: CargarjvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargarjvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
