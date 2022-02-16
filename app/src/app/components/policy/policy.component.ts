import { GlobalConstants } from './../../models/apiurl ';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';



@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  apiurl:string=GlobalConstants.parafoto;
  urlarmada="";
  ids = "/rep/";
  idcategoriapolicy:any;
  todaslascategorias:any;
  resultadotemporal:Array<{
    date: string;
    descripcion: string;
    foto_noticia: string;
    foto_portada: string;
    hide: number;
    id_categoria: number;
    id_noticia:number;
    portada:number;
    subtitulo: string;
    titulo: string;
    video_noticia: string;
    }>=[];
    news:any;
    todaslasnews:any;

  status='';
  estado=false;
  constructor(public service: NewsService, 
    private router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.status = localStorage.getItem('resultado')!;
      if (parseInt(this.status)==1){
        this.estado=true;
      }
      if (this.estado==true){
        this.service.GetNoticiaPolicyR().subscribe(
          (noticia: any) => {
            
            
            if(noticia.error==false){
              this.news=noticia.data;
            for(let i=0;i<this.news.length ;i++){

                  this.news[i].date=this.news[i].date.split("T");
                  if(this.news[i].foto_portada!="assets/imagennotavailable.png"){  
                      this.news[i].foto_portada="/assets/img/Fotos/"+this.news[i].foto_portada
                                      } else{ this.news[i].foto_portada="../../../assets/LOGO.png";}
                  // guardo link
                  
                  this.news[i].descripcion="/rep/"+this.news[i]._id;

                  this.resultadotemporal.push(this.news[i]);
              
            }
            this.todaslasnews=this.resultadotemporal;
          }});
      }
      else{
        this.service.GetNoticiaPolicy().subscribe(
          (noticia: any) => {
            
            if(noticia.error==false){
              this.news=noticia.data;
              for(let i=0;i<this.news.length ;i++){
                this.news[i].date=this.news[i].date.split("T"); 
                if(this.news[i].foto_portada!="assets/imagennotavailable.png"){  
                  this.news[i].foto_portada="/assets/img/Fotos/"+this.news[i].foto_portada
                }else{ this.news[i].foto_portada="../../../assets/LOGO.png";}
                  this.news[i].descripcion= "/rep/"+this.news[i]._id;
                  this.resultadotemporal.push(this.news[i]);
              }

            this.todaslasnews=this.resultadotemporal;}
          });
      }

      
  }

}
