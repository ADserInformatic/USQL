import { Photo } from './../models/photos.model';
import { GlobalConstants } from './../models/apiurl ';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  oRes = '';
  formData: Photo = new Photo;
  direccion: string= GlobalConstants.apiurl ;
  readonly rootURL=this.direccion;
  constructor(private http: HttpClient) { }


  GetFotos(){
    return this.http.get(this.rootURL + '/Fotos/GetFotos');
  }  
  GetFotosNR(){
    return this.http.get(this.rootURL + '/Fotos/GetFotosNR');
  }  
  GetFoto(id: string){
    return this.http.get(this.rootURL + '/Fotos/GetFoto/'+ id);
  }  
  DeleteFoto(id: string){
    return this.http.delete(this.rootURL + '/Fotos/DeleteFoto/'+id);
  }
  PostFotos(titulo:string,hide:string,url:File){
    const fd=new FormData();
    fd.append('titulo',titulo);
    fd.append('hide',hide);
    fd.append('url',url);
    return this.http.post(this.rootURL + '/Fotos/PostFotos', fd,{reportProgress:true,observe:'events'});
  }
  
}
