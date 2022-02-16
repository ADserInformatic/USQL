import { PhotosService } from './../../../services/photos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/models/apiurl ';

@Component({
  selector: 'app-fotosdel',
  templateUrl: './fotosdel.component.html',
  styleUrls: ['./fotosdel.component.css']
})
export class FotosdelComponent implements OnInit {
  // fotot:any;
  foto:any;
  direccion!:string;
    apiurl:string=GlobalConstants.parafoto;
status='';
estado=false;
rol='';
photo_id='';
  constructor(private router: Router, private pho_id: ActivatedRoute, private service: PhotosService) { }

  ngOnInit(): void {
    this.status = localStorage.getItem('resultado')!;
    if (parseInt(this.status)==1){  this.estado=true; }
    else{this.router.navigate(['/main']);}
    this.rol = localStorage.getItem('rol')!;
    if (parseInt(this.rol)==1){this.router.navigate(['/mainr']);}
    this.photo_id = this.pho_id.snapshot.paramMap.get('repp_id')!;
   
    this.service.GetFoto(this.photo_id).subscribe(
      (res:any)=>{
        this.foto=res;
        this.direccion="/assets/img/Fotos/"+res.url;
        console.log(this.direccion)
      }
    )
  }
  borrar(){
    this.service.DeleteFoto(this.photo_id).subscribe(
      res=>{this.router.navigate(['/pholist']);}
    )
  }
}
