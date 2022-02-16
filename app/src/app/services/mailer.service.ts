import { GlobalConstants } from './../models/apiurl ';
import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import {Consulta} from '../models/consulta.model';




@Injectable({
  providedIn: 'root'
})
export class MailerService {
  direccion: string= GlobalConstants.apiurl ;
  readonly rootURL=this.direccion;
  formData: Consulta = new Consulta;
  
  constructor(private http: HttpClient) { }
  clearFormData(){
    this.formData={
      nombre: "",
      correo: "",
      consulta: "",
    };
  }
  EnviarContacto(formData: Consulta) {
    return this.http.post(this.rootURL + '/Contacto/EnviarContacto',formData);
  }
}