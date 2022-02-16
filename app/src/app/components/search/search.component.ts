import { Category } from './../../models/category.model';
import { GlobalConstants } from './../../models/apiurl ';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router,NavigationEnd,NavigationStart, Event as NavigationEvent  } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Location } from '@angular/common';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
research=true;
 
  main:any;
  ids = "/rep/";
  urlarmada="";
  paraordenar:any;
  apiurl:string=GlobalConstants.parafoto;
  arraytemporal:any;
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
    noticiastodas:any;
  texkeyword="";
  texnoticia="";
  texnoticiatitle="";
  texnoticiasubtitle="";
  mostrar=true;
  ruta:any;
  status='';
  estado=false;
  categories:any;
  rol='';
  todaslasnews:any;
  validardate="^[0-9]{4}$"
  news:any;
  splitted="";
  cantidad=0;
  arrayordenar:Array<any>=[];
  rutaActual:any;
  
  userForm: FormGroup = this.formBuilder.group({
    category:[''],
    year: ['',Validators.pattern(this.validardate)],
    keyword: ['']
  });
  cartel=false;
  constructor(    private Location:Location, private formBuilder: FormBuilder, 
    public service: NewsService, 
    public servicecat: CategoriesService, 
    private router: Router,
    private _route: ActivatedRoute) {
      
    
  }
 

  ngOnInit(): void {
    
    this.cartel=false;
    this.userForm.patchValue(
      {otro:-1,
        category:-1
      });

  this.status = localStorage.getItem('resultado')!;
  if (parseInt(this.status)==1){
    this.estado=true;
  }else{this.estado=false}

    this.limpiar();
    this.servicecat.list().subscribe(
      (cat: any) => {
        this.categories=cat;//GUARDO TODAS LAS CATEGORIAS EN CATEGORIES
      }
    );
    this.ruta=this._route;
    if(this.Location.path()=="/download"){
      
      this.mostrar=true;}
    else{this.mostrar=false;};
  }
  

  onSubmit(){
    this.cantidad=0;
    this.cartel=false;
    this.ruta=this._route;
    // if(this.ruta.component.name=="DownloadComponent"){this.mostrar=true;}
    if(this.Location.path()=="/download"){this.mostrar=true;}
          else{this.router.navigate(['/download']);;}; //redirige pero no busca
    
          //LIMPIO
    for(let i=this.resultadotemporal.length;i>0 ;i--){
          this.resultadotemporal.pop();
        }
    
    for(let i=0;i<this.todaslasnews.length ;i++){ 

      this.texnoticia=this.todaslasnews[i].descripcion;
      this.texnoticia=this.texnoticia.toUpperCase();
      this.texnoticiatitle=this.todaslasnews[i].titulo;
      this.texnoticiatitle=this.texnoticiatitle.toUpperCase();
      this.texnoticiasubtitle=this.todaslasnews[i].subtitulo;
      this.texnoticiasubtitle=this.texnoticiasubtitle.toUpperCase();
      this.texkeyword=this.userForm.value.keyword;
      this.texkeyword=this.texkeyword.toUpperCase();
        if(this.userForm.value.category!=-1){  //SI NO SON TODAS LAS CATEGORIAS  
          if(this.todaslasnews[i].id_categoria==this.userForm.value.category){//1 ok
            
              if(this.userForm.value.year!=""){       // 1ok 2e
                  this.splitted=this.todaslasnews[i].date.toString().split("-");
                  if(this.userForm.value.year==this.splitted[0]){   //1ok2ok
                      if(this.userForm.value.keyword!=""){//   3e
                          //inicio
                            if((this.texnoticia.indexOf(this.texkeyword)!=-1)
                                  ||(this.texnoticiatitle.indexOf(this.texkeyword)!=-1)
                                  ||(this.texnoticiasubtitle.indexOf(this.texkeyword)!=-1)){    //miro tirulo                              
                              this.resultadotemporal.push(this.todaslasnews[i]);
                            }
                          //fin
                      }else{
                          this.resultadotemporal.push(this.todaslasnews[i]);// 1 2 ok 3sin
                      }                
                  }else{//1ok 2NO
                    this.cartel=true;//CARTEL NO RESULT
                  }
                }else{  //1ok 2sin
                    if(this.userForm.value.keyword!=""){//1ok 2sin 3e 

                          //inicio
                          if((this.texnoticia.indexOf(this.texkeyword)!=-1)
                          ||(this.texnoticiatitle.indexOf(this.texkeyword)!=-1)
                          ||(this.texnoticiasubtitle.indexOf(this.texkeyword)!=-1)){    //miro tirulo                              
                      this.resultadotemporal.push(this.todaslasnews[i]);
                    }
                  //fin

                      }else{ //1ok 2sin 3sin
                              this.resultadotemporal.push(this.todaslasnews[i]);
                            }              
                    }  
            }else{//1NO
                  this.cartel=true;//CARTEL NO RESULT
                  };
        }
        
        else{  //no puso 1
              if(this.userForm.value.year!=""){       // 1sin 2e
                  this.splitted=this.todaslasnews[i].date.toString().split("-");
                  if(this.userForm.value.year==this.splitted[0]){   //1sin2ok
                      if(this.userForm.value.keyword!=""){//   3e

                          //inicio
                          if((this.texnoticia.indexOf(this.texkeyword)!=-1)
                          ||(this.texnoticiatitle.indexOf(this.texkeyword)!=-1)
                          ||(this.texnoticiasubtitle.indexOf(this.texkeyword)!=-1)){    //miro tirulo                              
                      this.resultadotemporal.push(this.todaslasnews[i]);
                    }
                  //fin
                      }else{
                          this.resultadotemporal.push(this.todaslasnews[i]);// 1sin 2ok 3sin
                      }                
                  }else{//1sin 2NO
                     this.cartel=true;//CARTEL NO RESULT
                  }
                }else{//1sin 2sin 3e
                    if(this.userForm.value.keyword!=""){//   3e
                          //inicio
                          if((this.texnoticia.indexOf(this.texkeyword)!=-1)
                          ||(this.texnoticiatitle.indexOf(this.texkeyword)!=-1)
                          ||(this.texnoticiasubtitle.indexOf(this.texkeyword)!=-1)){    //miro tirulo                              
                      this.resultadotemporal.push(this.todaslasnews[i]);
                    }
                  //fin
                    }else{//1sin 2sin 3sin
                        this.resultadotemporal.push(this.todaslasnews[i]);//1sin 2sin 3sin
                    }      
                }
        }
    }//cierro for     
    this.news=this.resultadotemporal;
  };

  ordenarbusqueda(){
    this.news.reverse();
   }



  limpiainputs(){    
    this.userForm.patchValue(
    {year:"",
      category:-1,
      keyword:""
    });}

limpiar(){
  this.limpiainputs();
  this.limpiarresultado();
}

  limpiarresultado(){
  

    if(this.estado){
    this.service.listar().subscribe(
    (id: any) => {
      this.noticiastodas=id;
      for(let i=0;i<this.noticiastodas.length ;i++){
        if(this.noticiastodas[i].foto_portada!="assets/imagennotavailable.png"){  
          this.noticiastodas[i].foto_portada="/assets/img/Fotos/"+this.noticiastodas[i].foto_portada;
          }else{ this.noticiastodas[i].foto_portada="../../../assets/LOGO.png";}
        this.arraytemporal=this.noticiastodas[i].date.split("T");
        this.noticiastodas[i].date=this.arraytemporal[0];
                                    this.urlarmada="";
                                    this.urlarmada=this.ids+this.noticiastodas[i]._id;
                                    this.noticiastodas[i].descripcion=this.urlarmada;

      }
      this.news=this.noticiastodas;
      this.todaslasnews=this.noticiastodas;
    });
  }else{
    this.service.noticiaSearchNR().subscribe(
      (id: any) => {
        this.noticiastodas=id;
        for(let i=0;i<this.noticiastodas.length ;i++){
          if(this.noticiastodas[i].foto_portada!="assets/imagennotavailable.png"){  
            this.noticiastodas[i].foto_portada="/assets/img/Fotos/"+this.noticiastodas[i].foto_portada;
            }else{ this.noticiastodas[i].foto_portada="../../../assets/LOGO.png";}
          this.arraytemporal=this.noticiastodas[i].date.split("T");
          this.noticiastodas[i].date=this.arraytemporal[0];
          this.urlarmada="";
          this.urlarmada=this.ids+this.noticiastodas[i]._id;
          this.noticiastodas[i].descripcion=this.urlarmada;
          
        }
        this.news=this.noticiastodas;
        this.todaslasnews=this.noticiastodas;
      });
  }
}
iguales(){
  // if(this.userForm.value.otro==this.userForm.value.category){return true}else{return false}
}
}
