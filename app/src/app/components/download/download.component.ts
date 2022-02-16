import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  status='';
  estado=false;
  constructor() { }

  ngOnInit(): void {
    this.status = localStorage.getItem('resultado')!;
      if (parseInt(this.status)==1){
        this.estado=true;
      }
  }

}
