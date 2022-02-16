import { DomSanitizer } from '@angular/platform-browser';
import { VideosService } from './../../../services/videos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { GlobalConstants } from 'src/app/models/apiurl ';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import * as _ from 'lodash';
interface HtmlInputEvent extends Event {target: (HTMLInputElement & EventTarget);}


//import { CargarjvService } from 'src/app/services/cargarjv.service';






@Component({
  selector: 'app-videosadd',
  templateUrl: './videosadd.component.html',
  styleUrls: ['./videosadd.component.css']
})
export class VideosaddComponent implements OnInit {
  file!: File;
  photoSelected!:string | ArrayBuffer | null;
  error=false;
  status='';
  rol='';
  estado=false;
  imageUrl: string = "";
  urlapi:string=GlobalConstants.apiurl;
  datos:any;

  porcentaje=0;
  total:any;
  calculo:any;
  exito = false;
  errorcarga = false;
  subiendo=false;

  public archivos:any=[];
  loading!:boolean;



  photoForm: FormGroup=this.formBuilder.group({
    hide:['', Validators.required],
    url:['',Validators.required],
    titulo:['',Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    public service: VideosService,private router: Router,
    private sanitizer: DomSanitizer) {  }

  ngOnInit(): void {
    this.total=0;
    this.porcentaje=0;
    this.subiendo=false;
    this.errorcarga = false;
    this.exito=false;

    this.loading=false;
    this.photoForm.reset();
    this.photoForm.patchValue({hide:'1'});
    this.error=false;
     
    this.status = localStorage.getItem('resultado')!;
    if (parseInt(this.status)==1){  this.estado=true; }
    else{this.router.navigate(['/main']);}
    this.rol = localStorage.getItem('rol')!;
    if (parseInt(this.rol)==1){this.router.navigate(['/mainr']);}
  }

  uploadPhoto():boolean{
    this.subiendo=true;
   
    this.service.PostVideos(this.photoForm.value.titulo,this.photoForm.value.hide,this.file).subscribe(
      res=>{
        this.limpiarFoto();
        if(res.type===HttpEventType.UploadProgress){
          this.porcentaje=res.loaded;
          this.total=res.total;
          this.calculo=Math.round(this.porcentaje/this.total*100)+'%';
          //  console.log('Upload Progress: '+ Math.round(res.loaded/res.total*100)+'%')
        }else if(res.type===HttpEventType.Response){
            this.exito=true;
            setTimeout(() => {
              this.router.navigate(['/vidlist'])
            }, 3500);
        }
      },
      err=>{
        this.errorcarga=true;
        //mensaje de error y redirigir al segundo
        this.limpiarFoto();
        setTimeout(() => {
          this.router.navigate(['/vidlist'])
        }, 6000);
      },
    )
    
    return false;
  }

  onChange(event:any) {
    
    if(event.target.files&&event.target.files[0]){
      this.file=<File>event.target.files[0];
      //MOSTRAR PREVIEW
      const reader=new FileReader();
      reader.onload=e=>this.photoSelected=reader.result as string;
      reader.readAsDataURL(this.file)
    }
  }
  //para foto
  limpiarFoto(){
    this.photoForm.value.titulo="";
    this.photoForm.patchValue({url:''});
    this.photoForm.value.hide="";
    this.imageUrl = "";
  }
}
