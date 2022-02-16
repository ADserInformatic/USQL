import { GlobalConstants } from './../../models/apiurl ';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';
import { CategoriesService } from 'src/app/services/categories.service';



@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.css']
})
export class LatestComponent implements OnInit {
  //idnoticiaportada="";
  status='';     
  estado=false;    
  categorialatest:any;
  noticiasportadas:any;
  apiurl:string=GlobalConstants.parafoto;
  rol='';
  id_latest = "";
  errorlatest = false;
  arraytemporal:any;
  noticialatest:any;
  ids:any;
  ids_portada=[];
  respuesta:any;
  activada:any;
  previewtitulo:any;
  previewsubtitulo:any;
  previewdescripcion:any;
  previewurl:any;
  previewlink:any;
  
  Noticia= {
    category:'',
    Title: '',
    Subtitle: '',
    report: '',
    fotoport: '',
    fotonot: '',
    videonot: '',
    date:''

  };
  Noticia0= {
    Title: '',
    Subtitle: '',
    report: '',
    link: '',
    url: '',
    date:''

  };
  Noticia1= {
    Title: '',
    Subtitle: '',
    report: '',
    link: '',
    url: '',
    date:''

  };
  Noticia2= {
    Title: '',
    Subtitle: '',
    report: '',
    link: '',
    url: '',
    date:''

  };

  constructor(
    public service: NewsService, 
    public servicecat: CategoriesService, 
    private _route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.activada=0;
    this.errorlatest = false;
    this.status = localStorage.getItem('resultado')!;
    if (parseInt(this.status)==1){  this.estado=true; }
    else{this.router.navigate(['/main']);}

    this.rol = localStorage.getItem('rol')!;
    if (parseInt(this.rol)==1){this.router.navigate(['/mainr']);}
    
    
    
    if(this.estado==false){
        this.service.GetPortada().subscribe(
          (id: any) => {
            this.respuesta=id
            if(this.respuesta.error==false){
            this.noticiasportadas=this.respuesta.data;
            for(let i=0;i<this.noticiasportadas.length ;i++){
              this.arraytemporal=this.noticiasportadas[0].date.split("T");
              this.noticiasportadas[i].video_noticia="/rep/"+this.noticiasportadas[i]._id
              this.noticiasportadas[i].date=this.arraytemporal[0];
              // this.noticiasportadas[i].descripcion="/rep/"+this.noticiasportadas[i]._id;
            }
            if(this.noticiasportadas.length>=1){
              this.previewtitulo=this.noticiasportadas[0].titulo;
              this.Noticia0.Title=this.noticiasportadas[0].titulo;
              this.previewsubtitulo=this.noticiasportadas[0].subtitulo;
              this.Noticia0.Subtitle=this.noticiasportadas[0].subtitulo;
              this.previewdescripcion=this.noticiasportadas[0].descripcion;
              document.getElementById('descripcion')!.innerHTML=this.previewdescripcion;
              this.Noticia0.report==this.noticiasportadas[0].descripcion;
              this.previewlink=this.noticiasportadas[0].video_noticia;
              this.Noticia0.date=this.noticiasportadas[0].date;
              this.Noticia0.link=this.noticiasportadas[0].video_noticia;

              if(this.noticiasportadas[0].foto_portada=="assets/imagennotavailable.png"){  
                this.previewurl="../../../assets/LOGO.png";
                this.Noticia0.url="../../../assets/LOGO.png";
              }else{ this.previewurl="/assets/img/Fotos/"+this.noticiasportadas[0].foto_portada;
              this.Noticia0.url="/assets/img/Fotos/"+this.noticiasportadas[0].foto_portada}
            }
            
            if(this.noticiasportadas.length>=2){
              this.Noticia1.Title=this.noticiasportadas[1].titulo;
              this.Noticia1.Subtitle=this.noticiasportadas[1].subtitulo;
              this.Noticia1.report==this.noticiasportadas[1].descripcion;
              this.Noticia1.link=this.noticiasportadas[1].video_noticia;
              this.Noticia1.date=this.noticiasportadas[1].date;
              if(this.noticiasportadas[1].foto_portada=="assets/imagennotavailable.png"){  
                this.Noticia1.url="../../../assets/LOGO.png";
              }else{this.Noticia1.url="/assets/img/Fotos/"+this.noticiasportadas[1].foto_portada}
            }
            
            if(this.noticiasportadas.length>=3){
              this.Noticia2.Title=this.noticiasportadas[2].titulo;
              this.Noticia2.Subtitle=this.noticiasportadas[2].subtitulo;
              this.Noticia2.report==this.noticiasportadas[2].descripcion;
              this.Noticia2.link=this.noticiasportadas[2].video_noticia;
              this.Noticia2.date=this.noticiasportadas[2].date;
              if(this.noticiasportadas[2].foto_portada=="assets/imagennotavailable.png"){  
                this.Noticia2.url="../../../assets/LOGO.png";
              }else{this.Noticia2.url="/assets/img/Fotos/"+this.noticiasportadas[2].foto_portada}
            }
          }}
          );
      
      }
     else{
           
            this.service.GetPortadaR().subscribe(
              (id: any) => {
                this.respuesta=id
                if(this.respuesta.error==false){
                this.noticiasportadas=this.respuesta.data;

                for(let i=0;i<this.noticiasportadas.length ;i++){
                  this.arraytemporal=this.noticiasportadas[0].date.split("T");
                this.noticiasportadas[i].video_noticia="/rep/"+this.noticiasportadas[i]._id
                  this.noticiasportadas[i].date=this.arraytemporal[0];
                }

                if(this.noticiasportadas.length>=1){
                  this.previewtitulo=this.noticiasportadas[0].titulo;
                  this.Noticia0.Title=this.noticiasportadas[0].titulo;
                  this.previewsubtitulo=this.noticiasportadas[0].subtitulo;
                  this.Noticia0.Subtitle=this.noticiasportadas[0].subtitulo;
                  this.previewdescripcion=this.noticiasportadas[0].descripcion;
                  document.getElementById('descripcion')!.innerHTML=this.previewdescripcion;
                  this.Noticia0.report==this.noticiasportadas[0].descripcion;
                  this.previewlink=this.noticiasportadas[0].video_noticia;
                  this.Noticia0.date=this.noticiasportadas[0].date;
                  this.Noticia0.link=this.noticiasportadas[0].video_noticia;

                  if(this.noticiasportadas[0].foto_portada=="assets/imagennotavailable.png"){  
                    this.previewurl="../../../assets/LOGO.png";
                    this.Noticia0.url="../../../assets/LOGO.png";
                  }else{ this.previewurl="/assets/img/Fotos/"+this.noticiasportadas[0].foto_portada;
                  this.Noticia0.url="/assets/img/Fotos/"+this.noticiasportadas[0].foto_portada}
                }
                
                if(this.noticiasportadas.length>=2){
                  this.Noticia1.Title=this.noticiasportadas[1].titulo;
                  this.Noticia1.Subtitle=this.noticiasportadas[1].subtitulo;
                  this.Noticia1.report==this.noticiasportadas[1].descripcion;
                  this.Noticia1.link=this.noticiasportadas[1].video_noticia;
                  this.Noticia1.date=this.noticiasportadas[1].date;
                  if(this.noticiasportadas[1].foto_portada=="assets/imagennotavailable.png"){  
                    this.Noticia1.url="../../../assets/LOGO.png";
                  }else{this.Noticia1.url="/assets/img/Fotos/"+this.noticiasportadas[1].foto_portada}
                }
                
                if(this.noticiasportadas.length>=3){
                  this.Noticia2.Title=this.noticiasportadas[2].titulo;
                  this.Noticia2.Subtitle=this.noticiasportadas[2].subtitulo;
                  this.Noticia2.report==this.noticiasportadas[2].descripcion;
                  this.Noticia2.link=this.noticiasportadas[2].video_noticia;
                  this.Noticia2.date=this.noticiasportadas[2].date;
                  if(this.noticiasportadas[2].foto_portada=="assets/imagennotavailable.png"){  
                    this.Noticia2.url="../../../assets/LOGO.png";
                  }else{this.Noticia2.url="/assets/img/Fotos/"+this.noticiasportadas[2].foto_portada}
                }


            
            
            }
          
          }

              );
              
          }
          

          
        
        
       


    
   
  }
  opcion0():void{
    this.activada=0;
  
    this.previewtitulo=this.Noticia0.Title;
    this.previewsubtitulo=this.Noticia0.Subtitle
    this.previewdescripcion=this.Noticia0.report
    document.getElementById('descripcion')!.innerHTML=this.previewdescripcion;
    this.previewlink=this.Noticia0.link;
    this.previewurl=this.Noticia0.url;

}
  opcion1():void{
    this.activada=1;
    this.previewtitulo=this.Noticia1.Title;
    this.previewsubtitulo=this.Noticia1.Subtitle
    this.previewdescripcion=this.Noticia1.report
    document.getElementById('descripcion')!.innerHTML=this.previewdescripcion;
    this.previewlink=this.Noticia1.link;
    this.previewurl=this.Noticia1.url;
}
  opcion2():void{
    this.activada=2;
    this.previewtitulo=this.Noticia2.Title;
    this.previewsubtitulo=this.Noticia2.Subtitle
    this.previewdescripcion=this.Noticia2.report
    document.getElementById('descripcion')!.innerHTML=this.previewdescripcion;
    this.previewlink=this.Noticia2.link;
    this.previewurl=this.Noticia2.url;
}
  onSubmit(): void {
    };
    // this.categoriaelegida = await this.getCategoria(this.userForm.value.category);

}
