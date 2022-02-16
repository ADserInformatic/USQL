import { VideosService } from './../../../services/videos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/models/apiurl ';

@Component({
  selector: 'app-videosdel',
  templateUrl: './videosdel.component.html',
  styleUrls: ['./videosdel.component.css']
})
export class VideosdelComponent implements OnInit {
  // fotot:any;
  foto:any;
  direccion!:string;
    apiurl:string=GlobalConstants.parafoto;
status='';
estado=false;
rol='';
photo_id='';
  constructor(private router: Router, private pho_id: ActivatedRoute, private service: VideosService) { }

  ngOnInit(): void {
    this.status = localStorage.getItem('resultado')!;
    if (parseInt(this.status)==1){  this.estado=true; }
    else{this.router.navigate(['/main']);}
    this.rol = localStorage.getItem('rol')!;
    if (parseInt(this.rol)==1){this.router.navigate(['/mainr']);}
    this.photo_id = this.pho_id.snapshot.paramMap.get('vid_id')!;
   
    this.service.GetVideo(this.photo_id).subscribe(
      (res:any)=>{
        this.foto=res;
        this.direccion="/assets/img/Videos/"+res.url;
      }
    )
  }
  borrar(){
    console.log('enviado para q borre')
    this.service.DeleteVideo(this.photo_id).subscribe(
      res=>{
        this.router.navigate(['/vidlist'])
        ;}
    )
  }

}
