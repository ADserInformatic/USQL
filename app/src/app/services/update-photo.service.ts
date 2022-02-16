import { Injectable, Output,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdatePhotoService {
@Output() actualizado:EventEmitter<any>=new EventEmitter();
  constructor() { }
}
