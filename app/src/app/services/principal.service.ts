import { Principal } from './../models/principal.model';
import { GlobalConstants } from './../models/apiurl ';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {
  oRes = '';
  formData: Principal = new Principal;
  direccion: string= GlobalConstants.apiurl ;
  readonly rootURL=this.direccion;
  constructor(private http: HttpClient) { }

  Getmain(){
    return this.http.get(this.rootURL + '/Main/editPort');
  }
  Postmain(formData: Principal) {
    return this.http.post(this.rootURL + '/Main/editPortada', formData);
  }

  clearFormData() {
    this.formData = {
      urlwwa: "",
      textwwa: "",
      urlautor: "",
      textautor: "",
    };
  }

}
