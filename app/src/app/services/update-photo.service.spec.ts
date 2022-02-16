import { TestBed } from '@angular/core/testing';

import { UpdatePhotoService } from './update-photo.service';

describe('UpdatePhotoService', () => {
  let service: UpdatePhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatePhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
