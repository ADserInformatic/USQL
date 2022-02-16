import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/models/apiurl ';
import { PhotosService } from 'src/app/services/photos.service';
@Component({
  selector: 'app-reportphoto',
  templateUrl: './reportphoto.component.html',
  styleUrls: ['./reportphoto.component.css']
})
export class ReportphotoComponent implements OnInit {
  foto={
    url: '',
    hide:0,
    titulo:'',
    id_foto:'',
    direccion:'',
    };
    apiurl:string=GlobalConstants.parafoto;
status='';
estado=false;
rol='';
photo_id='';
  constructor(private router: Router, private pho_id: ActivatedRoute, private service: PhotosService) { }

  ngOnInit(): void {
    this.status = localStorage.getItem('resultado')!;
    if (parseInt(this.status)==1){  this.estado=true; }

    this.photo_id = this.pho_id.snapshot.paramMap.get('repp_id')!;
    this.service.GetFoto(this.photo_id).subscribe(
      (res:any)=>{
        this.foto=res;
        this.foto.direccion="/assets/img/Fotos/"+res.url;
        if(this.estado!){
          if(this.foto.hide==0){this.router.navigate(['/dvisuals'])}
        }
      }
    )



  

  }
  recargar(){setTimeout(function(){ window.location.reload();},50);};
}
