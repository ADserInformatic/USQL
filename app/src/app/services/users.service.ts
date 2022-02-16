import { GlobalConstants } from './../models/apiurl ';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';




@Injectable({
  providedIn: 'root'
})
export class UsersService {
  oRes = '';
  //user_id='';
  direccion: string= GlobalConstants.apiurl ;
  readonly rootURL=this.direccion;

   formData: User = new User;
  constructor(private http: HttpClient) {}
  
  DeleteUser(user_id: string){
    return this.http.delete(this.rootURL + '/user/DelUser/'+user_id);
  }
  postUsuario(formData: User) {
    return this.http.post(this.rootURL + '/user/register', formData);
  }
  postUser(formData: User) {
    return this.http.post(this.rootURL + '/user/register', formData);
  }
  editUser(formData:User, user_id: string){
    return this.http.post(this.rootURL + '/user/Modificar/'+ user_id, formData);
  }
  login(formData: User) {
    return this.http.post(this.rootURL + '/user/Login', formData);
  }
  acceder(user_id: string) {
    return this.http.get(this.rootURL + '/user/Perfil/' + user_id)
  }
  activate(user_id: string) {
    return this.http.get(this.rootURL + '/user/Act/' + user_id)
  }
  deactivate(user_id: string) {
    return this.http.get(this.rootURL + '/user/Dst/' + user_id)
  }
  changepswd(user_id: string, oldpwd:string, newpwd:string) {
    return this.http.get(this.rootURL + '/user/Changepswd/' + user_id +'/'+ oldpwd + '/' + newpwd)
  }

  chau(token: string) {
    return this.http.get(this.rootURL + '/user/Logout' + token)
  }
  listar() {
    return this.http.get(this.rootURL + '/user/GetUsers')
  }
  clearFormData() {
    this.formData = 
    {
      nickname: "",
      nombre: "",
      apellido: "",
      password: "",
      user_foto: "img/profile.png",
      active: true,
      token: "",
      email: "",
      rol: 1,
      user_descripcion: ""
    };
  }
}