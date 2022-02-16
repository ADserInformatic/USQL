import { Router } from '@angular/router';
import { PhotosService } from './../../../services/photos.service';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/models/apiurl ';

@Component({
  selector: 'app-fotoslist',
  templateUrl: './fotoslist.component.html',
  styleUrls: ['./fotoslist.component.css']
})
export class FotoslistComponent implements OnInit {
  status='';
  estado=false;
  apiurl:string=GlobalConstants.parafoto;
  idfoto!:string;
  fotos:any;
  

  constructor(private service: PhotosService, private route: Router) { }

  ngOnInit(): void {
    if (parseInt(this.status)==1){
      this.estado=true;
    }
   this.service.GetFotos().subscribe(
    (res:any)=>{
      this.fotos = res
      for(let i=0;i<this.fotos.length ;i++){ 
       this.fotos[i].url="assets/img/Fotos/" + this.fotos[i].url;                           
       }
    //  fetch('http://localhost:3001/api/Fotos/GetFotos')
    //  .then(res => res.json())
    //     .then(data=>{
    //     })
      }
     //(res:any)=>{
       //this.fotos=res;

       // for(let i=0;i<this.fotos.length ;i++){ 
         //this.fotos[i].url=this.apiurl + this.fotos[i].url;                           
       //}
      //this.fotos.reverse();
     //}
   )
  

  }

}
