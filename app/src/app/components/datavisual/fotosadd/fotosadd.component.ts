import { PhotosService } from './../../../services/photos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { GlobalConstants } from 'src/app/models/apiurl ';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import {Observable}  from 'rxjs';
import * as _ from 'lodash';
interface HtmlInputEvent extends Event {target: (HTMLInputElement & EventTarget);}

@Component({
  selector: 'app-fotosadd',
  templateUrl: './fotosadd.component.html',
  styleUrls: ['./fotosadd.component.css']
})
export class FotosaddComponent implements OnInit {
  @ViewChild('fileInput') userPhoto: any;
  file!: File;
  photoSelected!:string | ArrayBuffer | null;
  cardImageBase64: any;
  error=false;
  status='';
  rol='';
  defecto = "";
  estado=false;
  datos: any;
  imageUrl: string = "assets/imagennotavailable.png";
  urlapi:string=GlobalConstants.apiurl;

  porcentaje=0;
  total:any;
  calculo:any;
  exito = false;
  errorcarga = false;
  subiendo=false;

  photoForm: FormGroup=this.formBuilder.group({
    hide:['', Validators.required],
    url:['',Validators.required],
    titulo:['',Validators.required]
  });
 
  constructor(private formBuilder: FormBuilder,
    public service: PhotosService,private router: Router
    ) { }

  ngOnInit(): void {
    this.total=0;
    this.porcentaje=0;
    this.subiendo=false;
    this.errorcarga = false;
    this.exito=false;

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
   
    this.service.PostFotos(this.photoForm.value.titulo,this.photoForm.value.hide,this.file).subscribe(
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
              this.router.navigate(['/pholist'])
            }, 3500);
        }
      },
      err=>{
        this.errorcarga=true;
        //mensaje de error y redirigir al segundo
        this.limpiarFoto();
        setTimeout(() => {
          this.router.navigate(['/pholist'])
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
    limpiarFoto(){
      this.photoForm.value.titulo="";
      this.photoForm.patchValue({url:''});
      this.photoForm.value.hide="";
      this.imageUrl = "assets/imagennotavailable.png";
    }
  }







    // this.error=false;
    // this.service.clearFormData();

    // this.datos = this.imageUrl;
    // if (this.datos == "assets/imagennotavailable.png"){ 
    //   this.datos = ""
    // }else{
      
    //   this.datos = this.datos.substring(this.datos.indexOf(',')+1);
    // }
  
    // const enviar = {
    //   foto: this.datos,
    // };
    // this.service.formData = {
    //   url : this.datos,
    //   hide  : this.photoForm.value.hide,
    //   titulo : this.photoForm.value.titulo

    //   };
    //    // this.categoriaelegida = await this.getCategoria(this.userForm.value.category);
    // this.insertRecord();
  //}
  // insertRecord() {
    
  //   this.service.PostFotos(this.service.formData).subscribe(
  //     res => {
  //       //MOSTRAR UN MENSAJE QUE SE GUARDO CORRECTAMENTE
  //       this.router.navigate(['/pholist']);
  //       this.photoForm.reset();
  //     },
  //     (err: HttpErrorResponse) => {

  //       var MensajeError = err.error.message;
  //       console.log(err);
  //      console.log(MensajeError);
  //        console.log('algo malio sal');
  //           this.photoForm.reset();
        
        
  //       //this.router.navigate(['/usersadd']);
  //     }

  
  //para foto

    // if (fileInput4.target.files && fileInput4.target.files[0]) 
    // {
    //     // Size Filter Bytes
    //     const max_size = 10485760; 
    //     const allowed_types = ['image/png', 'image/jpeg'];
    //     const max_height = 600;
    //     const max_width = 600;

    //     if (fileInput4.target.files[0].size > max_size) {
    //         window.alert('Maximum size allowed is ' + (max_size/1024)/1024 + 'Mb');
    //         this.limpiarFoto()
    //         return false;
    //     }else{

    //           if (!_.includes(allowed_types, fileInput4.target.files[0].type)) 
    //               {
    //                   window.alert('Only Images are allowed ( JPG | PNG )');
    //                   this.limpiarFoto()
    //                   return false;
    //               }else{
    //                       const reader = new FileReader();
    //                       reader.onload = (e: any) => 
    //                         { 
    //                           const image = new Image();
    //                           image.src = e.target.result;
    //                            image.onload = (rs:any) => 
    //                           {
    //                             const img_height = rs.currentTarget['height'];
    //                             const img_width = rs.currentTarget['width'];
    //                             if (img_height > max_height && img_width > max_width) 
    //                               {
    //                                 window.alert('Maximum dimentions allowed '+max_height+'*'+max_width+'px');
    //                                 this.limpiarFoto()
    //                                 return false;
    //                               } else {
    //                                         const imgBase64Path = e.target.result;
    //                                         this.cardImageBase64 = imgBase64Path;
    //                                         this.imageUrl = e.target.result;    

    //                                         if(fileInput4.target.files[0]){
    //                                           reader.readAsDataURL(fileInput4.target.files[0]);
    //                                         }
    //                                         //reader.readAsDataURL(fileInput4.target.files[0]);                                                                   
    //                                       return}
    //                           } ;
    //                         };

    //                         if(fileInput4.target.files[0]){
    //                           reader.readAsDataURL(fileInput4.target.files[0]);
    //                         }
    //                          //reader.readAsDataURL(fileInput4.target.files[0]);
    //                      }
    //       }
    //   }
    // return

