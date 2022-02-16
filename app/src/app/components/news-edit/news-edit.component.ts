import { Component, OnInit,ViewChild,Output, EventEmitter } from '@angular/core';
import { GlobalConstants } from './../../models/apiurl ';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';
import { CategoriesService } from 'src/app/services/categories.service';
import * as _ from 'lodash';
import { UpdatePhotoService } from 'src/app/services/update-photo.service';



@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {
  @Output() public oldphotomain=new EventEmitter<any>();
  objetoReporte:any;

  @ViewChild('fileInput') userPhoto: any;
  fileportada!: File;
  filenoticia!: File;
  photoSelectedportada!:string | ArrayBuffer | null;
  photoSelectednoticia!:string | ArrayBuffer | null;
  imageUrl: string = "assets/imagennotavailable.png";
  urlapi:string=GlobalConstants.apiurl;
                          //fin foto
  cardImageBase64: any;
  datos: any;
  status='';
  estado=false;
  categories:any;
  categoriaactual:any;
  rol='';
  new_id = "";
  erroru = false;
  errorc = false;
  categoriaelegida:any;
  portada!:string;

  // FOTOPORTADA
  porcentaje0=0;
  total0:any;
  calculo0:any;
  exito0 = false;
  errorcarga0 = false;
  subiendo0=false;
  // FOTONOTICIA
  porcentaje=0;
  total:any;
  calculo:any;
  exito = false;
  errorcarga = false;
  subiendo=false;
  valorActualizado=false;

  userForm: FormGroup = this.formBuilder.group({
    category:['',Validators.required],
    titulo: ['', Validators.required],
    subtitulo: [''],
    report: ['', Validators.required],
    fotoport: [''],
    fotonot: [''],
    videonot: [''],
    portada: ['', Validators.required],
    hide: ['', Validators.required],
    tableau: ['']
  });
  constructor(
    private formBuilder: FormBuilder, 
    public service: NewsService, 
    public servicecat: CategoriesService, 
    private _route: ActivatedRoute,
    private router: Router,
    private updatePhoto:UpdatePhotoService) { }

  ngOnInit(): void {
    // FOTOPORTADA
    
    this.total0=0;
    this.porcentaje0=0;
    this.subiendo0=false;
    this.errorcarga0 = false;
    this.exito0=false;
    
    // FOTONOTICIA
    this.total=0;
    this.porcentaje=0;
    this.subiendo=false;
    this.errorcarga = false;
    this.exito=false;





    this.userForm.reset();
    this.errorc = false;
    this.status = localStorage.getItem('resultado')!;
    if (parseInt(this.status)==1){  this.estado=true; }
    else{this.router.navigate(['/main']);}
    this.rol = localStorage.getItem('rol')!;
    if (parseInt(this.rol)==1){this.router.navigate(['/mainr']);}
    
    this.new_id = this._route.snapshot.paramMap.get('new_id')!;
// valores

    this.service.acceder(this.new_id).subscribe(
      (noticia: any) => {
        if (noticia.portada=='0'){
          this.userForm.patchValue({portada:'0'});
        }else{
          this.userForm.patchValue({portada:'1'});
        }
        if (noticia.hide=='0'){
          this.userForm.patchValue({hide:'0'});
        }else{
          this.userForm.patchValue({hide:'1'});
        }
        if(noticia.foto_noticia=="assets/imagennotavailable.png"||noticia.foto_noticia=="")
        {this.photoSelectednoticia="assets/imagennotavailable.png"}else{this.photoSelectednoticia="/assets/img/Fotos/"+noticia.foto_noticia;}
        if(noticia.foto_portada=="assets/imagennotavailable.png"||noticia.foto_portada=="")
          {this.photoSelectedportada="assets/imagennotavailable.png"
            }else{
                  this.photoSelectedportada="/assets/img/Fotos/"+noticia.foto_portada;}
        this.objetoReporte={id:this.new_id,photo:this.photoSelectedportada};
        this.userForm.patchValue({titulo: noticia.titulo});  
        this.userForm.patchValue({subtitulo: noticia.subtitulo}); 
        this.userForm.patchValue({report: noticia.descripcion}); 
        
        this.userForm.patchValue({fotonoticia: noticia.foto_noticia}); 
        this.userForm.patchValue({videonoticia: noticia.video_noticia}); 
        this.userForm.patchValue({category: noticia.id_categoria}); 
        this.userForm.patchValue({tableau: noticia.tableau});
      }

    );
    this.servicecat.list().subscribe(
      (cat: any) => {
        this.categories=cat;
      }
    );


    
  }
  onSubmit(): void {
    this.subiendo=true;

    this.errorc = false;
    this.service.clearFormData();
    this.portada=this.userForm.value.portada
    console.log('antes')
    this.service.editNew(
      this.new_id,
      this.userForm.value.category,
      this.userForm.value.titulo,
      this.userForm.value.subtitulo,
      this.imageUrl,
      this.filenoticia,
      this.userForm.value.report,
      this.portada,
      this.userForm.value.hide,
      this.userForm.value.tableau
      
      ).subscribe(
      res=>{

        //this.limpiarFoto();
         if(res.type===HttpEventType.UploadProgress){
           this.porcentaje=res.loaded;
           this.total=res.total;
           this.calculo=Math.round(this.porcentaje/this.total*100)+'%';
           // console.log('Upload Progress: '+ Math.round(res.loaded/res.total!*100)+'%')
         }else if(res.type===HttpEventType.Response){
           console.log('termino de subir')
             this.exito=true;
             setTimeout(() => {
               this.router.navigate(['/newslist'])
             }, 3500);
         }
      
      },
      err=>{
        this.errorcarga=true;
        //mensaje de error y redirigir al segundo
        this.limpiarFoto();
        setTimeout(() => {
          this.router.navigate(['/newslist'])
        }, 6000);
      })
    
  }
  // onChange0(event:any) {
    
  //   if(event.target.files&&event.target.files[0]){
  //     this.fileportada=<File>event.target.files[0];
  //     //MOSTRAR PREVIEW
  //     const reader=new FileReader();
  //     reader.onload=e=>this.photoSelectedportada=reader.result as string;
  //     reader.readAsDataURL(this.fileportada)
  //   }
  // }
  onChange(event:any) {
    
    if(event.target.files&&event.target.files[0]){
      this.filenoticia=<File>event.target.files[0];
      //MOSTRAR PREVIEW
      const reader=new FileReader();
      reader.onload=event=>this.photoSelectednoticia=reader.result as string;
      reader.readAsDataURL(this.filenoticia)
    }
  }
    limpiarFoto(){
      this.userForm.patchValue({category:0});
      this.userForm.patchValue({portada:'1'});
      this.userForm.patchValue({hide:'1'});
      this.userForm.patchValue({fotoport:"assets/imagennotavailable.png"});
      this.userForm.patchValue({fotonot:"assets/imagennotavailable.png"});
      this.userForm.patchValue({videonot:'jhf'});
      this.userForm.patchValue({tableau:''});
    }
    actualizado(){
      // window.location.reload();
       this.service.acceder(this.new_id).subscribe(
         (noticia: any) => {
           if(noticia.foto_portada=="assets/imagennotavailable.png"||noticia.foto_portada=="")
           {this.photoSelectedportada="assets/imagennotavailable.png"
             }else{
                   this.photoSelectedportada="/assets/img/Fotos/"+noticia.foto_portada;}
         })
         this.objetoReporte={id:this.new_id,photo:this.photoSelectedportada};
    }
    
}


