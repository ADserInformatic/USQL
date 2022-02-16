import { GlobalConstants } from './../../models/apiurl ';
import { NewsService } from 'src/app/services/news.service';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { Location } from '@angular/common';
import { CargarjvService } from 'src/app/services/cargarjv.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  apiurl:string=GlobalConstants.parafoto;
  imagenportada=false;
  imagennoticia=false;
  tableau=false;
  id_reporte="";
  status='';
  rol='';
  download=false;
  oculto=false;
  estado=false;
  reporte:any;
  arraytemporal:any;
  noticia:any;
  constructor(public service: NewsService, public servicecat: CategoriesService,private router: Router, private _route: ActivatedRoute, private location: Location, private carga:CargarjvService) 
  {
     carga.CargaScript(['tableau.js']);
   }

  ngOnInit(): void {
    this.download=false;
    this.tableau=false;
    this.imagenportada=false;
  this.imagennoticia=false;
    this.oculto=false;
    this.status = localStorage.getItem('resultado')!;
      if (parseInt(this.status)==1){
        this.estado=true;
              }else{this.estado=false}
    
      this.id_reporte = this._route.snapshot.paramMap.get('rep_id')!;//id noticia

      this.service.acceder(this.id_reporte).subscribe(
        (res: any) => {
          this.reporte=res;
          if(this.reporte.foto_portada!="assets/imagennotavailable.png"&&this.reporte.foto_portada!=""&&this.reporte.foto_portada!="undefined"){
            this.reporte.foto_portada="/assets/img/Fotos/"+this.reporte.foto_portada;
            this.imagenportada=true;
          }else{ 
            this.imagenportada=false;
          }
          if(this.reporte.foto_noticia!="assets/imagennotavailable.png"&&this.reporte.foto_noticia!=""&&this.reporte.foto_noticia!="undefined"){
            this.reporte.foto_noticia="/assets/img/Fotos/"+this.reporte.foto_noticia;
            this.imagennoticia=true;
          }else{this.imagennoticia=false;}
            this.arraytemporal=this.reporte.date.split("T");
            this.reporte.date=this.arraytemporal[0];
            if(this.reporte.hide==0){
              this.oculto=true;                
            }
            if(this.reporte.video_noticia&&this.reporte.video_noticia!=""){
              this.download=true;
            }else{this.reporte.video_noticia=""};
            document.getElementById('descripcion')!.innerHTML=this.reporte.descripcion;
            if(this.reporte.tableau!=""){this.tableau=true}else{this.tableau=false}
          }
          
      );
      
      if(this.estado!) 
      {
        if(this.oculto){
          this.router.navigate(['/main']);                 
        }
      }
  }
  descargar(){
    
          window.location.href='/assets/img/PDFS/'+this.reporte.video_noticia;

        }
      
  goback(){this.location.back();}

}
