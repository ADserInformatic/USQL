import { Component, OnInit,ViewChild } from '@angular/core';
import { GlobalConstants } from './../../models/apiurl ';
import { HttpErrorResponse,HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';
import { CategoriesService } from 'src/app/services/categories.service';
interface HtmlInputEvent extends Event {target: (HTMLInputElement & EventTarget);}
import * as _ from 'lodash';


@Component({
  selector: 'app-addpdf',
  templateUrl: './addpdf.component.html',
  styleUrls: ['./addpdf.component.css']
})
export class AddpdfComponent implements OnInit {



  @ViewChild('fileInput') userPhoto: any;
  fileportada!: File;
  photoSelectedportada!:string | ArrayBuffer | null;
  imageUrl: string = "";
  urlapi:string=GlobalConstants.apiurl;
                          //fin foto
                          porcentaje=0;
                          total:any;
                          calculo:any;
                          exito = false;
                          errorcarga = false;
                          subiendo=false;
  
  datos: any;
  status='';
  estado=false;

  rol='';
  new_id = "";
  erroru = false;
  errorc = false;
  userForm: FormGroup = this.formBuilder.group({
    video_noticia: ['', Validators.required],
  });


  constructor(
    private formBuilder: FormBuilder, 
    public service: NewsService, 
    private _route: ActivatedRoute,
    private router: Router) { }

    ngOnInit(): void {  
      this.total=0;
      this.porcentaje=0;
      this.subiendo=false;
      this.errorcarga = false;
      this.exito=false;

      this.new_id = this._route.snapshot.paramMap.get('new_id')!;
      this.errorc = false;
      this.status = localStorage.getItem('resultado')!;
      if (parseInt(this.status)==1){  this.estado=true; }
      else{this.router.navigate(['/main']);}
      this.rol = localStorage.getItem('rol')!;
      if (parseInt(this.rol)==1){this.router.navigate(['/mainr']);}
      
    
      
      console.log(this.new_id)
  // valores
     
    }

    
    onSubmit(): boolean {
      this.errorc = false;
      this.subiendo=true;
      this.service.postPDF(this.new_id,this.fileportada).subscribe(
        res=>{
          
          if(res.type===HttpEventType.UploadProgress){
            this.porcentaje=res.loaded;
            this.total=res.total;
            this.calculo=Math.round(this.porcentaje/this.total*100)+'%';
            //  console.log('Upload Progress: '+ Math.round(res.loaded/res.total*100)+'%')
          }else if(res.type===HttpEventType.Response){
              this.exito=true;
              setTimeout(() => {
                this.router.navigate(['/newslist'])
              }, 3500);
          }
        },
        err=>{
          this.errorcarga=true;
          setTimeout(() => {
            this.router.navigate(['/newslist'])
          }, 6000);
        })
        
      return false;
    }




    onChange(event:any) {
      
      if(event.target.files&&event.target.files[0]){
        this.fileportada=<File>event.target.files[0];
        //MOSTRAR PREVIEW
        const reader=new FileReader();
        reader.onload=e=>this.photoSelectedportada=reader.result as string;
        reader.readAsDataURL(this.fileportada)
      }
    }

  }



