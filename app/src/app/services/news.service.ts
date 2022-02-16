import { GlobalConstants } from './../models/apiurl ';
import { Injectable } from '@angular/core';
import { HttpClient,HttpEventType } from '@angular/common/http';
import { New } from '../models/new.model';
import { pdf } from '../models/pdf';
import { Busqueda} from '../models/search.model';
import {estadologuin} from '../models/estado.model';


@Injectable({
  providedIn: 'root'
})
export class NewsService {
  oRes = '';
  //new_id='';
  formData: New = new New;
  formPDF: pdf = new pdf;
  // Busq: Busqueda= new Busqueda;
  EstLog: estadologuin = new estadologuin;
  direccion: string= GlobalConstants.apiurl ;
  readonly rootURL=this.direccion;
  ProgressBar=0;

  constructor(private http: HttpClient) { }

  DeleteNew(new_id: string){
    return this.http.delete(this.rootURL + '/Noticias/DeleteNoticia/'+ new_id);
  }
  postNew(
    
    id_categoria:string,
    titulo:string,
    subtitulo:string,
    foto_portada:File,
    foto_noticia:File,
    descripcion:string,
    portada:string,
    hide:string,
    tableau:string
    ){
      
    const fd=new FormData();
    fd.append('id_categoria',id_categoria);
    fd.append('titulo',titulo);
    fd.append('subtitulo',subtitulo);
    fd.append('foto_portada',foto_portada);
    fd.append('foto_noticia',foto_noticia);
    fd.append('descripcion',descripcion);
    fd.append('portada',portada);
    fd.append('hide',hide);
    fd.append('tableau',tableau);
    return this.http.post(this.rootURL + '/Noticias/register', fd,{reportProgress:true,observe:'events'});
  }
  postPDF(
    new_id: any,
    video_noticia:File,
    ){
      
    const fd=new FormData();
    fd.append('video_noticia',video_noticia);
    return this.http.post(this.rootURL + '/Noticias/addpdf/'+ new_id, fd,{reportProgress:true,observe:'events'});
  }
  delPDF(new_id:any){
    return this.http.delete(this.rootURL + '/Noticias/delpdf/'+ new_id);
  }
  // getPDF(new_id: string){
  //   return this.http.get(this.rootURL + '/Noticias/dlpdf/'+ new_id);
  // }

  changeportada(id_categoria: string,foto_portada:File,){
    const fd=new FormData();
    fd.append('id_categoria',id_categoria);
    fd.append('foto_portada',foto_portada);
    return this.http.post(this.rootURL + '/Noticias/ChangePort/'+ id_categoria, fd,{reportProgress:true,observe:'events'});
  }
  editNew(
    new_id: string,
    id_categoria:string,
    titulo:string,
    subtitulo:string,
    foto_portada:string,
    foto_noticia:File,
    descripcion:string,
    portada:string,
    hide:string,
    tableau:string){
      const fd=new FormData();
    fd.append('id_categoria',id_categoria);
    fd.append('titulo',titulo);
    fd.append('subtitulo',subtitulo);
    fd.append('foto_portada',foto_portada);
    fd.append('foto_noticia',foto_noticia);
    fd.append('descripcion',descripcion);
    fd.append('portada',portada);
    fd.append('hide',hide);
    fd.append('tableau',tableau);
    return this.http.post(this.rootURL + '/Noticias/edit/'+ new_id, fd,{reportProgress:true,observe:'events'});
  }

  acceder(new_id: string) {
    return this.http.get(this.rootURL + '/Noticias/GetNoticia/' + new_id)
  }
  GetLatest() {
    return this.http.get(this.rootURL + '/Noticias/GetLatest')
  }
  GetPortada() {
    return this.http.get(this.rootURL + '/Noticias/GetPortada')
  }
  GetPortadaR() {
    return this.http.get(this.rootURL + '/Noticias/GetPortada')
  }
  GetLatestR() {
    return this.http.get(this.rootURL + '/Noticias/GetLatestR')
  }
  GetNoticiaPolicy(){
    return this.http.get(this.rootURL + '/Noticias/GetNoticiaPolicy')
  }
  GetNoticiaPolicyR(){
    return this.http.get(this.rootURL + '/Noticias/GetNoticiaPolicyR')
  }
  noticiaSearchNR(){
    return this.http.get(this.rootURL + '/Noticias/noticiaSearchNR')
  }
  GetNoticiaLiteracy(){
    return this.http.get(this.rootURL + '/Noticias/GetNoticiaLiteracy')
  }
  GetNoticiaLiteracyR(){
    return this.http.get(this.rootURL + '/Noticias/GetNoticiaLiteracyR')
  }
  listar() {
    return this.http.get(this.rootURL + '/Noticias/GetNoticia')
  }
  // busq(Busq:Busqueda){
  //   return this.http.post(this.rootURL + '/Noticias/busq', Busq);
  // }
   clearFormData() {
    //  this.formData = {
    //    id_categoria : 1,
    //    titulo  : "",
    //    subtitulo : "",
    //    descripcion : "",
    //   foto_portada : "/img/profile.png",
    //   foto_noticia : "",
    //  video_noticia : "",
    //  portada : 1,
    //   hide : 1,
   };
   
}