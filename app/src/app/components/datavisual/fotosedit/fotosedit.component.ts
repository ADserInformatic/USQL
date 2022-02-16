import { Component, OnInit,Input,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsService } from 'src/app/services/news.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { UpdatePhotoService } from 'src/app/services/update-photo.service';


@Component({
  selector: 'app-fotosedit',
  templateUrl: './fotosedit.component.html',
  styleUrls: ['./fotosedit.component.css']
})
export class FotoseditComponent implements OnInit {
  @Input() objetoReporte:any;
  photoSelectedportada!:string | ArrayBuffer | null;
  oldphoto:any;
  fileportada!: File;
  imageUrl: string = "assets/imagennotavailable.png";
  id:any;
  sincargar=true;


  porcentaje=0;
  total:any;
  calculo:any;
  exito = false;
  errorcarga = false;
  subiendo=false;
  constructor(private formBuilder: FormBuilder,    public service: NewsService, private updatePhoto:UpdatePhotoService) { }

  ngOnInit(): void {
    this.sincargar=true;
    setTimeout(()=>{
      this.oldphoto=this.objetoReporte?.photo;
      this.id=this.objetoReporte?.id;
    },2000)
  }

  Subir(): boolean {
    this.subiendo=true;
    this.sincargar=true;
    this.errorcarga = false;
    this.service.changeportada(
      this.id,
      this.fileportada,
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
            this.updatePhoto.actualizado.emit(this.exito)
        }
      
      },
      err=>{
        this.errorcarga=true;
        //mensaje de error y redirigir al segundo
        this.limpiarFoto();
      })

    return false;
  }


  onChange(event:any) {
    this.sincargar=false
    if(event.target.files&&event.target.files[0]){
      this.fileportada=<File>event.target.files[0];
      //MOSTRAR PREVIEW
      const reader0=new FileReader();
      reader0.onload=e=>this.photoSelectedportada=reader0.result as string;
      reader0.readAsDataURL(this.fileportada)
    }
  }
  limpiarFoto(){
  //  this.fotoport="assets/imagennotavailable.png"
  }
}
