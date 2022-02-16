import { GlobalConstants } from './../../models/apiurl ';
import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';
import { CategoriesService } from 'src/app/services/categories.service';
import {Observable}  from 'rxjs';
interface HtmlInputEvent extends Event {target: (HTMLInputElement & EventTarget);}
import * as _ from 'lodash';





@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.css']
})
export class NewsAddComponent implements OnInit {

                        //para foto 
  @ViewChild('fileInput') userPhoto: any;
  fileportada!: File;
  filenoticia!: File;
  subiendo=false;
  photoSelectedportada!:string | ArrayBuffer | null;
  photoSelectednoticia!:string | ArrayBuffer | null;
  carga_completa = false;
    cardImageBase64: any;
    id: any;
    defecto = "";
    datos: any;
    imageUrl: string = "assets/imagennotavailable.png";
                          //fin foto
    defecto2 = "";
    card2ImageBase64: any;
    imageUrln: string = "assets/imagennotavailable.png";
    datosn: any;



    
    urlapi:string=GlobalConstants.apiurl;

portada!:string;
  status='';
  estado=false;
  categories:any;
  rol='';
  porcentaje=0;
  total:any;
  calculo:any;
  exito = false;
  errorc = false;
categoriaelegida:any;
userForm: FormGroup = this.formBuilder.group({
    category:['',Validators.required],
    titulo: ['', Validators.required],
    subtitulo: [''],
    report: ['', Validators.required],
    fotoportada: [''],
    fotonoticia: [''],
    videonot: [''],
    portada: ['', Validators.required],
    hide: ['', Validators.required],
    tableau: ['']
  });
  constructor(
    private formBuilder: FormBuilder, 
    public service: NewsService, 
    public servicecat: CategoriesService, 
    private router: Router) { }

  ngOnInit(): void {
    this.total=0;
    this.porcentaje=0;
    this.subiendo=false;
    this.userForm.reset();
    // this.userForm.patchValue({category:'-1'});
    this.userForm.patchValue({titulo:''});
    this.userForm.patchValue({subtitulo:''});
    this.userForm.patchValue({portada:'1'});
    this.userForm.patchValue({hide:'1'});
    this.userForm.patchValue({fotoportada:"assets/imagennotavailable.png"});
    this.userForm.patchValue({fotonoticia:"assets/imagennotavailable.png"});
    this.userForm.patchValue({videonot:''});
    this.userForm.patchValue({tableau:''});
    
    this.errorc = false;
    this.exito=false;
    this.status = localStorage.getItem('resultado')!;
    if (parseInt(this.status)==1){  this.estado=true; }
    else{this.router.navigate(['/main']);}
    this.rol = localStorage.getItem('rol')!;
    if (parseInt(this.rol)==1){this.router.navigate(['/mainr']);}

    this.servicecat.list().subscribe(
      (res: any) => {
        this.categories=res;
      }
    );
    //this.userForm.get('Title')?.focus();
    
  }
  onSubmit():boolean{
    this.subiendo=true;
    this.portada=this.userForm.value.portada
    this.service.postNew(
      this.userForm.value.category,
      this.userForm.value.titulo,
      this.userForm.value.subtitulo,
      this.fileportada,
      this.filenoticia,
      this.userForm.value.report,
      this.portada,
      this.userForm.value.hide,
      this.userForm.value.tableau
      
      ).subscribe(
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
              this.router.navigate(['/newslist'])
            }, 3500);
        }
      },
      err=>{

        this.errorc=true;
        //mensaje de error y redirigir al segundo
        this.limpiarFoto();
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
    limpiarFoto(){
      this.userForm.patchValue({category:5});
      this.userForm.patchValue({portada:'1'});
      this.userForm.patchValue({hide:'1'});
      this.userForm.patchValue({fotoport:"assets/imagennotavailable.png"});
      this.userForm.patchValue({fotonot:"assets/imagennotavailable.png"});
      this.userForm.patchValue({videonot:'jhf'});
    }
    limpiarFoto1(){
      //this.userPhoto.nativeElement.value = null;
      this.photoSelectedportada = "assets/imagennotavailable.png";
    }
    limpiarFoto2(){
      //this.userPhoto.nativeElement.value = null;
      this.photoSelectednoticia = "assets/imagennotavailable.png";
    }
  }




                      //para foto
  // onChange(fileInput: any) {
  //   if (fileInput.target.files && fileInput.target.files[0]) 
  //   {
  //       // Size Filter Bytes
  //       const max_size = 10485760;
  //       const allowed_types = ['image/png', 'image/jpeg'];
  //       const max_height = 10000;
  //       const max_width = 10000;

  //       if (fileInput.target.files[0].size > max_size) {
  //           window.alert('Maximum size allowed is ' + (max_size/1024)/1024 + 'Mb');
  //           this.limpiarFoto()
  //           return false;
  //       }else{

  //             if (!_.includes(allowed_types, fileInput.target.files[0].type)) 
  //                 {
  //                     window.alert('Only Images are allowed ( JPG | PNG )');
  //                     this.limpiarFoto()
  //                     return false;
  //                 }else{
  //                         const reader = new FileReader();
  //                         reader.onload = (e: any) => 
  //                           { 
  //                             const image = new Image();
  //                             image.src = e.target.result;
  //                              image.onload = (rs:any) => 
  //                             {
  //                               const img_height = rs.currentTarget['height'];
  //                               const img_width = rs.currentTarget['width'];
  //                               if (img_height > max_height && img_width > max_width) 
  //                                 {
  //                                   window.alert('Maximum dimentions allowed '+max_height+'*'+max_width+'px');
  //                                   this.limpiarFoto()
  //                                   return false;
  //                                 } else {
  //                                           const imgBase64Path = e.target.result;
  //                                           this.cardImageBase64 = imgBase64Path;
                                           
  //                                           this.imageUrl = e.target.result;    
  //                                           reader.readAsDataURL(fileInput.target.files[0]);                                                                   
  //                                         return}
  //                             } ;
  //                           };
  //                           reader.readAsDataURL(fileInput.target.files[0]);
  //                        }
  //         }
  //     }
  //   return}


  // //para foto
  // onChange2(fileInput2: any) {
  //   if (fileInput2.target.files && fileInput2.target.files[0]) 
  //   {
  //       // Size Filter Bytes
  //       const max_size = 10485760;
  //       const allowed_types = ['image/png', 'image/jpeg'];
  //       const max_height = 600;
  //       const max_width = 600;

  //       if (fileInput2.target.files[0].size > max_size) {
  //           window.alert('Maximum size allowed is ' + (max_size/1024)/1024 + 'Mb');
  //           this.limpiarFoto()
  //           return false;
  //       }else{

  //             if (!_.includes(allowed_types, fileInput2.target.files[0].type)) 
  //                 {
  //                     window.alert('Only Images are allowed ( JPG | PNG )');
  //                     this.limpiarFoto()
  //                     return false;
  //                 }else{
  //                         const reader = new FileReader();
  //                         reader.onload = (e: any) => 
  //                           { 
  //                             const image = new Image();
  //                             image.src = e.target.result;
  //                              image.onload = (rs:any) => 
  //                             {
  //                               const img_height = rs.currentTarget['height'];
  //                               const img_width = rs.currentTarget['width'];
  //                               if (img_height > max_height && img_width > max_width) 
  //                                 {
  //                                   window.alert('Maximum dimentions allowed '+max_height+'*'+max_width+'px');
  //                                   this.limpiarFoto()
  //                                   return false;
  //                                 } else {
  //                                           const imgBase64Path = e.target.result;
  //                                           this.card2ImageBase64 = imgBase64Path;
  //                                           this.imageUrln = e.target.result;    
  //                                           reader.readAsDataURL(fileInput2.target.files[0]);                                                                   
  //                                         return}
  //                             } ;
  //                           };
  //                           reader.readAsDataURL(fileInput2.target.files[0]);
  //                        }
  //         }
  //     }
  //   return}


                  //fin foto





              //foto para enviar pero lo puedo borrar
//   actualizar(){
//     this.datos = this.imageUrl;
//     if (this.datos == "https://bulma.io/images/placeholders/480x480.png" || this.datos=="https://localhost:44389"+this.defecto){ 
//       this.datos = ""
//     }else{
//       console.log('llegue aca');
//       this.datos = this.datos.substring(this.datos.indexOf(',')+1);
//     }
//     const enviar = {
//       foto: this.datos,
//     };
//       //ENVIO LOS DATOS DE LA IMAGEN AL SERVICIO
//     // this.LG.editarUser(enviar).subscribe(data => {
//     //   if(data.estado){
//     //     this.subiendo = true;
//     //     window.location.reload();
//     //   }
//     //   else{
//     //     this.subiendo = true;
//     //     window.alert(data.reporte);
//     //     console.log(data.error);
//     //   }
//     // });
//   }
// }
