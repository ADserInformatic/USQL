import { GlobalConstants } from './../models/apiurl ';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  oRes = '';
  formData: Category = new Category;
  direccion: string= GlobalConstants.apiurl ;
  readonly rootURL=this.direccion;
  constructor(private http: HttpClient) { }

  delCategory(cat_id: string){
    return this.http.delete(this.rootURL + '/Categorias/DeleteCategoria/'+cat_id);
  }
  // postCategory(formData: Category) {
  //   return this.http.post(this.rootURL + '/Categories/register', formData);
  // }
  addCategory(formData: Category) {
    return this.http.post(this.rootURL + '/Categorias/PostCategoria', formData);
  }
  editCategory(formData:Category, cat_id: string){
    return this.http.post(this.rootURL + '/Categorias/edit/'+ cat_id, formData);
  }
  
  list() {
    return this.http.get(this.rootURL + '/Categorias/GetCategoria')
  }
  view(cat_id: any) {
    return this.http.get(this.rootURL + '/Categorias/GetCategoria/' + cat_id)
  }
  clearFormData() {
    this.formData = {
      nombre: "",
      portada: 1,
      hide: 1,

    };
  }
}
