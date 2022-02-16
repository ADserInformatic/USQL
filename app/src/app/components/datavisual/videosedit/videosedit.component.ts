import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/models/apiurl ';
import { VideosService } from 'src/app/services/videos.service';
@Component({
  selector: 'app-videosedit',
  templateUrl: './videosedit.component.html',
  styleUrls: ['./videosedit.component.css']
})
export class VideoseditComponent implements OnInit {
  apiurl:string=GlobalConstants.parafoto;
  video:any
    status='';
    estado=false;
    rol='';
    video_id='';



  constructor(private router: Router, private vid_id: ActivatedRoute, private service:VideosService) { }

  ngOnInit(): void {
    this.status = localStorage.getItem('resultado')!;
    if (parseInt(this.status)==1){  this.estado=true; }

    this.video_id = this.vid_id.snapshot.paramMap.get('vid_id')!;
    this.service.GetVideo(this.video_id).subscribe(
      (res:any)=>{
        this.video=res;
        this.video.url="/assets/img/Videos/"+res.url;
        if(this.estado!){
          if(this.video.hide==0){this.router.navigate(['/dvisuals'])}
        }
      }
    )
  }

}
