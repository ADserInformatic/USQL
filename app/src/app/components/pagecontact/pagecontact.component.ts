import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagecontact',
  templateUrl: './pagecontact.component.html',
  styleUrls: ['./pagecontact.component.css']
})
export class PagecontactComponent implements OnInit {

  constructor() { }
  status='';
  estado=false;
  ngOnInit(): void {this.status = localStorage.getItem('resultado')!;
  if (parseInt(this.status)==1){
    this.estado=true;
  }
  }

}
