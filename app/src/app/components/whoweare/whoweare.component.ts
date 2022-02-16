import { CargarjvService } from './../../services/cargarjv.service';
import { Component, OnInit } from '@angular/core';
import { PrincipalService } from 'src/app/services/principal.service';

@Component({
  selector: 'app-whoweare',
  templateUrl: './whoweare.component.html',
  styleUrls: ['./whoweare.component.css']
})
export class WhoweareComponent implements OnInit {
  autores:any;
  autor={
    urlautor:"",
    textautor:"",
    urlwwa:"",
    textwwa:"",
  }
  
    constructor(
      private cargaJS:CargarjvService,
      public service:PrincipalService) {    cargaJS.CargaScript(['slider.js']); }
  
    ngOnInit(): void {
  
      this.service.Getmain().subscribe(
        (res:any)=>{
          this.autores=res
          this.autor.textautor=this.autores.textautor;
          this.autor.urlautor=this.autores.urlautor;
          this.autor.urlwwa=this.autores.urlwwa;
          this.autor.textwwa=this.autores.textwwa;
  
        }
      )
    }
  
  }
  