import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideosService } from 'src/app/services/videos.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-videoslist',
  templateUrl: './videoslist.component.html',
  styleUrls: ['./videoslist.component.css']
})
export class VideoslistComponent implements OnInit {
  categories:any;
  constructor(public service: VideosService, private router: Router) { }


  ngOnInit(): void {
    this.service.list().subscribe(
      (category: any) => {
        // this.categories=JSON.parse(category);
        this.categories=category;
      },(err: HttpErrorResponse) => {console.log(err)}
    );
  }

}
