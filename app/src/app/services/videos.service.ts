import { GlobalConstants } from './../models/apiurl ';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Video } from '../models/videos.model';

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  oRes = '';
  formData: Video = new Video;
  direccion: string= GlobalConstants.apiurl ;
  readonly rootURL=this.direccion;
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(this.rootURL + '/Videos/GetVideos')
  }
  listNR() {
    return this.http.get(this.rootURL + '/Videos/GetVideosNR')
  }
  GetVideo (id:any){
  return this.http.get(this.rootURL+'/Videos/GetVideo/'+id)
  }
  PostVideos(titulo:string,hide:string,url:File) {
    const fd=new FormData();
    fd.append('titulo',titulo);
    fd.append('hide',hide);
    fd.append('url',url);
    return this.http.post(this.rootURL + '/Videos/PostVideo', fd,{reportProgress:true,observe:'events'});
  }
  DeleteVideo(id: string){
    return this.http.delete(this.rootURL + '/Videos/DeleteVideo/'+id);
  }
}
